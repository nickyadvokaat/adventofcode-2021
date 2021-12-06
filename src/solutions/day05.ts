import {readFile} from "../util/fileUtil"

export default function day05() {
    const map = new Map(1000)
    readFile("05")
        .map(line => line
            .split(' -> ')
            .map(y => y.split(','))
            .flat()
            .map(y => Number(y))
        )
        .forEach(line => {
            map.fill(line[0], line[1], line[2], line[3])
        })
    console.log(map.score())
}

class Map {
    dim: number
    coords: number[][]

    constructor(dim: number) {
        this.dim = dim
        this.coords = []
        for (let y = 0; y < this.dim; y++) {
            this.coords[y] = Array(this.dim).fill(0)
        }
    }

    fill(ax: number, ay: number, bx: number, by: number): void {
        const dx = ax === bx ? 0 : ax < bx ? 1 : -1
        const dy = ay === by ? 0 : ay < by ? 1 : -1
        if (dy === 0) {
            for (let x = ax; x !== bx + dx; x += dx) {
                this.coords[ay][x]++
            }
        } else {
            let x = ax
            for (let y = ay; y !== by + dy; y += dy) {
                this.coords[y][x]++
                x += dx
            }
        }
    }

    score(): number {
        let score = 0
        for (let y = 0; y < this.dim; y++) {
            for (let x = 0; x < this.dim; x++) {
                if (this.coords[y][x] > 1) {
                    score++
                }
            }
        }
        return score
    }

    print(): void {
        for (let y = 0; y < this.dim; y++) {
            console.log(this.coords[y]
                .toString()
                .replace(new RegExp(',', 'g'), '')
                .replace(new RegExp('0', 'g'), '.')
            )
        }
    }
}