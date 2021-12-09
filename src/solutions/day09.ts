import {readFile} from "../util/fileUtil"

/* istanbul ignore next */
export default function day09() {
    const input = readFile("09")
    const map = new Map(input[0].length, input.length)
    input.forEach((line, y) => {
        line.split('').map(v => Number(v)).forEach((value, x) => {
            map.set(new Coord(x, y), value)
        })
    })
    console.log(map.riskLevel())
    console.log(map.partTwo())
}

class Map {
    private readonly data: number[][]
    private readonly width: number
    private readonly height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.data = []
        for (let x = 0; x < width; x++) {
            this.data[x] = []
        }
    }

    set(c: Coord, value: number) {
        this.data[c.x][c.y] = value
    }

    riskLevel(): number {
        return this.lowPoints().reduce((sum, current) => sum + this.get(current) + 1, 0)
    }

    partTwo(): number {
        return this.lowPoints()
            .map(c => this.sizeOfBasin(c))
            .sort((n1, n2) => n2 - n1)
            .splice(0, 3)
            .reduce((sum, current) => sum * current, 1)
    }

    private sizeOfBasin(startCoord: Coord): number {
        let basin: Coord[] = []
        basin.push(startCoord)
        let added: Coord[] = []
        added.push(startCoord)
        while (added.length !== 0) {
            const newAdded: Coord[] = []
            added.forEach(a => {
                this.surrounding(a)
                    .filter(x => !basin.some(c => c.x === x.x && c.y === x.y))
                    .filter(x => {
                        const value = this.get(x)
                        return this.get(startCoord) <= value && value < 9
                    })
                    .forEach(x => {
                        if (!newAdded.some(c => c.x === x.x && c.y === x.y)) {
                            newAdded.push(x)
                        }
                    })
            })
            added = newAdded
            basin = basin.concat(added)
        }
        return basin.length
    }

    private lowPoints(): Coord[] {
        const result = []
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.isLowPoint({x, y} as Coord)) {
                    result.push({x, y} as Coord)
                }
            }
        }
        return result
    }

    private get(c: Coord): number {
        return this.data[c.x][c.y]
    }

    private surrounding(c: Coord): Coord[] {
        const result: Coord[] = []
        for (let x = Math.max(c.x - 1, 0); x <= Math.min(c.x + 1, this.width - 1); x++) {
            for (let y = Math.max(c.y - 1, 0); y <= Math.min(c.y + 1, this.height - 1); y++) {
                if ((x === c.x || y === c.y) && !(x === c.x && y === c.y)) {
                    result.push({x, y} as Coord)
                }
            }
        }
        return result
    }

    private isLowPoint(c: Coord): boolean {
        const value = this.get(c)
        return !this.surrounding(c).some(x => this.get(x) <= value)
    }
}

// tslint:disable-next-line:max-classes-per-file
class Coord {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}