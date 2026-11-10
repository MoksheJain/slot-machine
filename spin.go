package main
import "math/rand"

func GenerateSymbolArray(symbols map[string]uint) []string {
	symbolArr := []string{}
	
	for symbol, count := range symbols {
		for i := 0; i < int(count); i++ {
			symbolArr = append(symbolArr, symbol)
		}
	}

	return symbolArr
}

func GetSpin(reel []string, rows int, cols int) [][]string {
	if rows <= 0 || cols <= 0 || rows > len(reel) {
		return nil
	}

	result := make([][]string, rows)
	for row := range result {
		result[row] = make([]string, 0, cols)
	}

	for col := 0; col < cols; col++ {
		selected := make(map[int]bool)

		for row := 0; row < rows; row++ {
			for {
				randomIndex := rand.Intn(len(reel))
				if !selected[randomIndex] {
					selected[randomIndex] = true
					result[row] = append(result[row], reel[randomIndex])
					break
				}
			}
		}
	}

	return result
}

func CheckWin(spin [][]string, multipliers map[string]uint) []uint {
	lines := make([]uint, 0, len(spin))
	for _, row := range spin {
		if len(row) == 0 {
			lines = append(lines, 0)
			continue
		}

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