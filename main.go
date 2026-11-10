package main
import "fmt"
import "math/rand"

func getName() string {
	name := ""
	fmt.Println("Welcome to Casino Royale")
	fmt.Printf("Enter your name: ")
	_, err := fmt.Scanln(&name)
	if err != nil {
		return ""
	}
	fmt.Printf("Welcome %s, let's play!\n", name)
	return name
}

func getBet(balance uint) uint {
	var bet uint 
	for true {
		fmt.Printf("Enter your bet or 0 to quit (balance = $%d): ", balance)
		fmt.Scan(&bet)

		if bet > balance {
			fmt.Println("You cannot bet more than your balance.")
		} else if bet == 0 {
			fmt.Println("You have chosen to quit the game. Thanks for playing!")
			break
		} else {
			break
		}
	}
	return bet
}

func generateSymbolArray(symbols map[string]uint) []string {
	symbolArr := []string{}
	for symbol, count := range symbols {
		for i := 0; i < int(count); i++ {
			symbolArr = append(symbolArr, symbol)
		}
	}
	return symbolArr
}

func getRandomNumber(min int, max int) int {
	randomNumber := rand.Intn(max - min + 1) + min
	return randomNumber
}

func getSpin(reel []string, rows int, cols int) [][]string {
	result := [][]string{}

	for i := 0; i < rows; i++ {
		result = append(result, []string{})
	}

	for col := 0; col < cols; col++ {
		selected := map[int]bool{}
		for row := 0; row < rows; row++ {
			for true {
				randomIndex := getRandomNumber(0, len(reel) - 1)
				_, exists := selected[randomIndex]
				if !exists {
					selected[randomIndex] = true
					result[row] = append(result[row], reel[randomIndex])
					break
				}
			}
		}
	}

	return result
}

func printSpin(spin [][]string) {
	for _, row := range spin {
		for j, symbol := range row {
			fmt.Printf(symbol) 
			if j != len(row) - 1 {
				fmt.Printf(" | ")
			}
		}
		fmt.Println()
	}
}

func checkWin(spin [][]string, multipliers map[string]uint) []uint {
	lines := []uint{}
	for _, row := range spin {
		win := true
		checkSymbol := row[0]
		for _, symbol := range row[1:] {
			if symbol != checkSymbol {
				win = false
				break
			}
		}
		if win {
			lines = append(lines, multipliers[checkSymbol])
		} else {
			lines = append(lines, 0)
		}
	}
	return lines
}

func main() {

	// A is the most rare symbol, D is the most common symbol. The payout is based on the rarity of the symbol.

	symbols := map[string]uint {
		"A": 4,
		"B": 7,
		"C": 12,
		"D": 18,
	}

	symbolArr := generateSymbolArray(symbols)
	spin := getSpin(symbolArr, 3, 3)
	printSpin(spin)

	multipliers := map[string]uint {
		"A": 20,
		"B": 10,
		"C": 5,
		"D": 2,
	}

	balance := uint(200)
	getName()
	
	for balance > 0 {
		bet := getBet(balance)
		balance -= bet
		if bet == 0 {
			break
		}
		spin := getSpin(symbolArr, 3, 3)
		printSpin(spin)

		// check win, update balance, print new balance
		winningLines := checkWin(spin, multipliers)
		fmt.Println(winningLines)

		for i, multi := range winningLines {
			win := multi * bet
			balance += win
			if multi > 0 {
				fmt.Printf("Won $%d, (%dx) on line #%d\n", win, multi, i + 1)
			}
		}

		fmt.Printf("You have bet $%d. Your new balance is $%d.\n", bet, balance)
	}

	fmt.Printf("You left with, $%d. Thanks for playing!\n", balance)

	// fmt.Println("Hello World")
}