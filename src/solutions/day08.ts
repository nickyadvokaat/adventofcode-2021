import {readFile} from "../util/fileUtil"

/* istanbul ignore next */
export default function day08() {
    const input = readFile("08")
    console.log(countUniqueDigits(input))
    console.log(input.reduce((sum, current) => sum + determineNumber(current), 0))
}

function determineNumber(data: string): number {
    const split = data.split(' | ')
    const input = split[0].split(' ')
    const output = split[1].split(' ')

    const one = input.filter(x => x.length === 2)[0]
    const four = input.filter(x => x.length === 4)[0]
    const seven = input.filter(x => x.length === 3)[0]
    const eight = input.filter(x => x.length === 7)[0]

    const nine = input.filter(x => ![one, four, seven, eight].includes(x)).filter(x => isSubsetOf(x, four))[0]
    const E = charDiff(eight, nine)
    const two = input.filter(x => x.length === 5 && isSubsetOf(x, E))[0]
    const three = input.filter(x => ![one, two, four, seven, eight, nine].includes(x)).filter(x => isSubsetOf(x, seven) && !isSubsetOf(x, E))[0]
    const five = input.filter(x => ![one, two, three, four, seven, eight, nine].includes(x)).filter(x => x.length === 5)[0]
    const six = input.filter(x => ![one, two, three, four, five, seven, eight, nine].includes(x)).filter(x => isSubsetOf(x, five) && isSubsetOf(x, E))[0]
    const zero = input.filter(x => ![one, two, three, four, five, six, seven, eight, nine].includes(x))[0]

    return Number(output.reduce((sum, current) => {
        let c = ""
        if (equalCharacters(current, zero)) {
            c = "0"
        }
        if (equalCharacters(current, one)) {
            c = "1"
        }
        if (equalCharacters(current, two)) {
            c = "2"
        }
        if (equalCharacters(current, three)) {
            c = "3"
        }
        if (equalCharacters(current, four)) {
            c = "4"
        }
        if (equalCharacters(current, five)) {
            c = "5"
        }
        if (equalCharacters(current, six)) {
            c = "6"
        }
        if (equalCharacters(current, seven)) {
            c = "7"
        }
        if (equalCharacters(current, eight)) {
            c = "8"
        }
        if (equalCharacters(current, nine)) {
            c = "9"
        }
        return sum + c
    }, ""))
}

function charDiff(superset: string, subset: string): string {
    return superset.split('').filter(x => !subset.includes(x)).join('')
}

function isSubsetOf(superset: string, subset: string): boolean {
    let result = true
    subset.split('').forEach(x => {
        if (!superset.includes(x)) {
            result = false
        }
    })
    return result
}

function equalCharacters(a: string, b: string): boolean {
    return a.length === b.length && isSubsetOf(a, b)
}

function countUniqueDigits(input: string[]): number {
    return input
        .map(x => x.split(' | ')[1])
        .reduce((sum, current) => {
            return sum + current
                .split(' ')
                .filter(x => [2, 3, 4, 7].includes(x.length))
                .length
        }, 0)
}
