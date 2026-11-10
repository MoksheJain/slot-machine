package main

import (
	"encoding/json"
	"net/http"
	"sync"
	"strings"
)

type GameState struct {
	Name    string `json:"name"`
	Balance uint   `json:"balance"`
	Started bool   `json:"started"`
}

type StartRequest struct {
	Name string `json:"name"`
}

type SpinRequest struct {
	Bet uint `json:"bet"`
}

type SpinResponse struct {
	Spin         [][]string `json:"spin"`
	WinningLines []uint     `json:"winningLines"`
	Bet          uint       `json:"bet"`
	Winnings     uint       `json:"winnings"`
	Balance      uint       `json:"balance"`
}

var (
	game GameState
	gameMutex sync.Mutex
	reel = GenerateSymbolArray(Symbols)
)

func sendJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func StartGameHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req StartRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		http.Error(w, "Name cannot be empty", http.StatusBadRequest)
		return
	}

	gameMutex.Lock()
	defer gameMutex.Unlock()

	game = GameState {
		Name: req.Name,
		Balance: InitialBalance,
		Started: true,
	}

	sendJSON(w, http.StatusOK, game)
}

func SpinHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SpinRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	gameMutex.Lock()
	defer gameMutex.Unlock()

	if !game.Started {
		http.Error(w, "Game not started", http.StatusBadRequest)
		return
	}

	if req.Bet == 0 {
		http.Error(w, "Bet must be greater than 0", http.StatusBadRequest)
		return
	}

	if req.Bet > game.Balance {
		http.Error(w, "Bet cannot be more than balance", http.StatusBadRequest)
		return
	}

	game.Balance -= req.Bet

	spin := GetSpin(reel, Rows, Cols)

	winningLines := CheckWin(spin, Multipliers)

	var winnings uint

	for _, multipler := range winningLines {
		winnings += multipler * req.Bet	
	}

	game.Balance += winnings

	response := SpinResponse {
		Spin: spin,
		WinningLines: winningLines,
		Bet: req.Bet,
		Winnings: winnings,
		Balance: game.Balance,
	}

	sendJSON(w, http.StatusOK, response)
}

func GameStateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	gameMutex.Lock()
	defer gameMutex.Unlock()

	if !game.Started {
		http.Error(w, "No active game", http.StatusBadRequest)
		return
	}

	sendJSON(w, http.StatusOK, game)
}