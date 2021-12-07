import {readFile} from "../util/fileUtil"

export default function day07() {
    const positions = readFile("07")[0].split(',').map(x => Number(x))
    let minimalFuel = Number.MAX_VALUE
    for (let i = Math.min(...positions); i <= Math.max(...positions); i++) {
        const fuel = positions.reduce((sum, current) => {
            const diff = Math.abs(current - i)
            return sum + ((diff * (diff + 1)) / 2)
        }, 0)
        minimalFuel = Math.min(minimalFuel, fuel)
    }
    console.log(minimalFuel)
}