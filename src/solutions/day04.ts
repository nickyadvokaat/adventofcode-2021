import {readFile} from "../util/fileUtil"

export default function day04() {
    const input = readFile("04")
    const calls = input[0].split(",").map(x => Number(x))
    const bingos: Bingo[] = []
    for (let i = 1; i < input.length; i++) {
        const line = input[i]
        if (line === "") {
            bingos[bingos.length] = new Bingo()
        } else {
            bingos[bingos.length - 1]
                .addRow(line
                    .trim()
                    .replace(/ +/g, " ")
                    .split(" ")
                    .map(x => Number(x)))
        }
    }

    let count = 0
    for (const call of calls) {
        for (const bingo of bingos) {
            bingo.checkNumber(call)
            if (!bingo.completed && bingo.isComplete()) {
                count++
                if (count === bingos.length) {
                    console.log(call * bingo.sumUnmarked())
                }
            }
        }
    }
}

class Bingo {
    tiles: Tile[][]
    completed: boolean = false

    constructor() {
        this.tiles = []
    }

    addRow(row: number[]) {
        this.tiles[this.tiles.length] = []
        for (let i = 0; i < row.length; i++) {
            this.tiles[this.tiles.length - 1][i] = new Tile(row[i])
        }
    }

    checkNumber(numberToCheck: number) {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles.length; j++) {
                if (this.tiles[i][j].value === numberToCheck) {
                    this.tiles[i][j].isChecked = true
                }
            }
        }
    }

    isComplete(): boolean {
        for (let i = 0; i < this.tiles.length; i++) {
            let countX = 0
            let countY = 0
            for (let j = 0; j < this.tiles.length; j++) {
                if (this.tiles[i][j].isChecked) {
                    countX++
                }
                if (this.tiles[j][i].isChecked) {
                    countY++
                }
            }
            if (countX === this.tiles.length || countY === this.tiles.length) {
                this.completed = true
                return true
            }
        }

        return false
    }

    sumUnmarked(): number {
        let sum = 0
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles.length; j++) {
                if (!this.tiles[i][j].isChecked) {
                    sum += this.tiles[i][j].value
                }
            }
        }
        return sum
    }
}

// tslint:disable-next-line:max-classes-per-file
class Tile {
    value: number
    isChecked: boolean

    constructor(value: number) {
        this.value = value
        this.isChecked = false
    }
}