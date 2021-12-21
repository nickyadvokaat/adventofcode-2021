export default function day21() {
    const result = diracDice([8, 9])
    console.log(result)
}

const diceThrows = [3, 4, 5, 6, 7, 8, 9]
const frequencies = [1, 3, 6, 7, 6, 3, 1]

export function diracDice(pos: number[], score: number[] = [0, 0], turn0: boolean = true): number[] {
    if (score[0] >= 21) return [1, 0]
    if (score[1] >= 21) return [0, 1]
    return diceThrows.reduce((sum, diceSum, index) => {
        const pos0 = !turn0 ? pos[0] : ((pos[0] + diceSum - 1) % 10) + 1
        const pos1 = turn0 ? pos[1] : ((pos[1] + diceSum - 1) % 10) + 1
        const score0 = !turn0 ? score[0] : score[0] + pos0
        const score1 = turn0 ? score[1] : score[1] + pos1
        const result = diracDice([pos0, pos1], [score0, score1], !turn0)
        return [sum[0] + frequencies[index] * result[0], sum[1] + frequencies[index] * result[1]]
    }, [0, 0])
}