import * as fs from "fs"

/* istanbul ignore next */
export function readFile(day: string): string[] {
    return fs
        .readFileSync("data/day" + day + ".txt", "utf8")
        .split("\n")
}