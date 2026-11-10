package main
import "fmt"

// if you want a function to be accessible outside of the package, it must start with a captial letter. If it starts with a lowercase letter, it is private to the package. 

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

	symbolArr := GenerateSymbolArray(symbols)
	spin := GetSpin(symbolArr, 3, 3)
	PrintSpin(spin)

	multipliers := map[string]uint {
		"A": 20,
		"B": 10,
		"C": 5,
		"D": 2,
	}

	balance := uint(200)
	GetName()
	
	for balance > 0 {
		bet := GetBet(balance)
		balance -= bet
		if bet == 0 {
			break
		}
		spin := GetSpin(symbolArr, 3, 3)
		PrintSpin(spin)

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