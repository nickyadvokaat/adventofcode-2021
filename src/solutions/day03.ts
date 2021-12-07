import {readFile} from "../util/fileUtil"

export default function day03() {
    const binaryNumbers = readFile("03-test")
    console.log(powerConsumption(binaryNumbers))
    console.log(lifeSupportRating(binaryNumbers))
}

export function powerConsumption(binaryNumbers: string[]): number {
    const totals = Array<number>(binaryNumbers[0].length).fill(0)
    binaryNumbers.forEach(x => {
            x.split('').forEach((value, index) => {
                totals[index] += Number(value)
            })
        }
    )
    let gamma = ""
    let epsilon = ""
    const threshold = binaryNumbers.length / 2
    totals.forEach(total => {
        gamma += (total > threshold) ? '1' : '0'
        epsilon += (total > threshold) ? '0' : '1'
    })
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

export function lifeSupportRating(binaryNumbers: string[]): number {
    let binaryNumbers1 = [...binaryNumbers]
    let bitPosition = 0
    while (binaryNumbers1.length !== 1) {
        const v = mostCommonValue(binaryNumbers1, bitPosition)
        binaryNumbers1 = binaryNumbers1.filter(x => {
            if (v === "1" || v === "") {
                return x[bitPosition] === "1"
            } else {
                return x[bitPosition] === "0"
            }
        })
        bitPosition++
    }
    let binaryNumbers2 = [...binaryNumbers]
    bitPosition = 0
    while (binaryNumbers2.length !== 1) {
        const v = mostCommonValue(binaryNumbers2, bitPosition)
        binaryNumbers2 = binaryNumbers2.filter(x => {
            if (v === "1" || v === "") {
                return x[bitPosition] === "0"
            } else {
                return x[bitPosition] === "1"
            }
        })
        bitPosition++
    }
    return parseInt(binaryNumbers1[0], 2) * parseInt(binaryNumbers2[0], 2)
}

function mostCommonValue(input: string[], bitPosition: number): string {
    const count1 = input.filter(x => x[bitPosition] === "1").length
    const size = input.length
    if (size % 2 === 0 && count1 === size / 2) {
        return ""
    }
    return count1 > size / 2 ? "1" : "0"
}
