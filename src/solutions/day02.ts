import {readFile} from "../util/fileUtil"

interface ISubCommand {
    instruction: string
    value: number
}

export default function day02() {
    const commands = readFile("02")
        .map((x: string) => x.split(' '))
        .map(x => ({
            instruction: x[0],
            value: Number(x[1])
        } as ISubCommand))

    let horizontal = 0
    let depth = 0
    for (const command of commands) {
        switch (command.instruction) {
            case "forward":
                horizontal += command.value
                break
            case "up":
                depth -= command.value
                break
            case "down":
                depth += command.value
                break
        }
    }
    console.log(horizontal * depth)

    horizontal = 0
    depth = 0
    let aim = 0
    for (const command of commands) {
        switch (command.instruction) {
            case "forward":
                horizontal += command.value
                depth += command.value * aim
                break
            case "up":
                aim -= command.value
                break
            case "down":
                aim += command.value
                break
        }
    }
    console.log(horizontal * depth)
}