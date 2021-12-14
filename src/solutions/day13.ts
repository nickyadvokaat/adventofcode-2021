import {readFile} from "../util/fileUtil"

/* istanbul ignore next */
export default function day13() {
    const data = readFile("13")
    const transparentPaper = new TransparentPaper()
    data.forEach(line => {
        if (line.includes(',')) {
            const split = line.split(',').map(x => Number(x))
            transparentPaper.mark(new Coord(split[0], split[1]))
        } else if (line.includes('fold')) {
            const split = line.split('along')[1].trim().split('=')
            transparentPaper.fold(split[0], Number(split[1]))
        }
    })
    transparentPaper.print()
    console.log(transparentPaper.numberOfDots())
}

export class TransparentPaper {
    private data: Coord[]

    constructor() {
        this.data = []
    }

    mark(c: Coord) {
        this.data.push(c)
    }

    fold(direction: string, index: number) {
        const remove: Coord[] = []
        this.data.forEach(c => {
            if (direction === "y" && c.y >= index) {
                c.y = 2 * index - c.y
                if (this.data.filter(c2 => c2.x === c.x && c2.y === c.y).length > 1 || c.y < 0) {
                    remove.push(c)
                }
            } else if (direction === "x" && c.x >= index) {
                c.x = 2 * index - c.x
                if (this.data.filter(c2 => c2.x === c.x && c2.y === c.y).length > 1 || c.x < 0) {
                    remove.push(c)
                }
            }

        })
        this.data = this.data.filter(c => !remove.includes(c))
    }

    numberOfDots(): number {
        return this.data.length
    }

    /* istanbul ignore next */
    print() {
        for (let y = 0; y < 6; y++) {
            let s = ''
            for (let x = 0; x < 39; x++) {
                s += this.data.some(c => c.x === x && c.y === y) ? '█' : ' '
            }
            console.log(s)
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Coord {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}