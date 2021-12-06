import {readFile} from "../util/fileUtil"

export default function day06() {
    const counts = Array(9).fill(0)
    readFile("06")[0].split(',').map(x => Number(x)).forEach(x => {
        counts[x]++
    })
    let pointer = 0
    let day = 0
    while (day < 256) {
        const spawn = counts[pointer]
        counts[pointer] = 0
        pointer = (pointer + 1) % 9
        counts[(pointer + 6) % 9] += spawn
        counts[(pointer + 8) % 9] += spawn
        day++
    }
    console.log(counts.reduce((sum, current) => sum + current, 0))
}
