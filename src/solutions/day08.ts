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
    const m = Array(10).fill(undefined) as string[]

    m[1] = input.filter(x => x.length === 2)[0]
    m[4] = input.filter(x => x.length === 4)[0]
    m[7] = input.filter(x => x.length === 3)[0]
    m[8] = input.filter(x => x.length === 7)[0]

    m[9] = input.filter(x => ![m[1], m[4], m[7], m[8]].includes(x)).filter(x => isSubsetOf(x, m[4]))[0]
    const E = charDiff(m[8], m[9])
    m[2] = input.filter(x => x.length === 5 && isSubsetOf(x, E))[0]
    m[3] = input.filter(x => ![m[1], m[2], m[4], m[7], m[8], m[9]].includes(x)).filter(x => isSubsetOf(x, m[7]) && !isSubsetOf(x, E))[0]
    m[5] = input.filter(x => ![m[1], m[2], m[3], m[4], m[7], m[8], m[9]].includes(x)).filter(x => x.length === 5)[0]
    m[6] = input.filter(x => ![m[1], m[2], m[3], m[4], m[5], m[7], m[8], m[9]].includes(x)).filter(x => isSubsetOf(x, m[5]) && isSubsetOf(x, E))[0]
    m[0] = input.filter(x => ![m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9]].includes(x))[0]

    return Number(output.reduce((sum, current) => {
        const index = m.findIndex(x => equalCharacters(current, x))
        return sum + String(index)
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
