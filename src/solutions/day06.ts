import {readFile} from "../util/fileUtil"

export default function day06() {
    const startPopulation = readFile("06")[0].split(',').map(x => Number(x))
    console.log(numberOfFish(startPopulation, 80))
    console.log(numberOfFish(startPopulation, 256))
}

export function numberOfFish(startPopulation: number[], numberOfDays: number): number {
    const counts = Array(9).fill(0)
    startPopulation.forEach(x => {
        counts[x]++
    })
    let pointer = 0
    let day = 0
    while (day < numberOfDays) {
        const spawn = counts[pointer]
        counts[pointer] = 0
        pointer = (pointer + 1) % 9
        counts[(pointer + 6) % 9] += spawn
        counts[(pointer + 8) % 9] += spawn
        day++
    }
    return counts.reduce((sum, current) => sum + current, 0)
}