import {readFile} from "../util/fileUtil"

/* istanbul ignore next */
export default function day10() {
    const totalSyntaxErrorScore = readFile("10")
        .map(x => firstIllegalCharacter(x))
        .filter(x => x !== '')
        .reduce((sum, current) => {
            return sum + [25137, 1197, 57, 3][['>', '}', ']', ')'].indexOf(current)]
        }, 0)
    console.log(totalSyntaxErrorScore)

    const autoCompleteScores = readFile("10")
        .map(x => autoCompleteScore(x))
        .filter(x => x !== -1)
        .sort((n1, n2) => n2 - n1)
    const middleAutoCompleteScore = autoCompleteScores[Math.floor(autoCompleteScores.length / 2)]
    console.log(middleAutoCompleteScore)
}

function autoCompleteScore(line: string): number {
    const start = ['<', '{', '[', '(']
    const end = ['>', '}', ']', ')']
    const stack = new Stack()
    for (const x of line.split('')) {
        if (start.includes(x)) {
            stack.push(x)
        } else {
            const next = stack.look()
            if (start.indexOf(next) === end.indexOf(x)) {
                stack.pop()
            } else {
                return -1
            }
        }
    }
    return stack.autoCompleteScore()
}

function firstIllegalCharacter(line: string): string {
    const start = ['<', '{', '[', '(']
    const end = ['>', '}', ']', ')']
    const stack = new Stack()
    for (const x of line.split('')) {
        if (start.includes(x)) {
            stack.push(x)
        } else {
            const next = stack.look()
            if (start.indexOf(next) === end.indexOf(x)) {
                stack.pop()
            } else {
                return x
            }
        }
    }
    return ''
}

class Stack {
    data: string[]

    constructor() {
        this.data = []
    }

    push(char: string) {
        this.data.push(char)
    }

    look(): string {
        return this.data[this.data.length - 1]
    }

    pop() {
        this.data.splice(this.data.length - 1, 1)
    }

    autoCompleteScore(): number {
        return this.data
            .reverse()
            .reduce((sum, current) => sum * 5 + [4, 3, 2, 1][['<', '{', '[', '('].indexOf(current)], 0)
    }
}