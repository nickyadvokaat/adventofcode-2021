import {readFile} from "../util/fileUtil"

export default function day01() {
    const file = readFile("01")
        .map((x: string) => Number(x)) as [number]
    console.log(depthMeasurement(file, 1))
    console.log(depthMeasurement(file, 3))
}

/**
 * Perform a depth measurement
 *
 * @param sonarReport Array of numbers from depth report
 * @param window Scanning window size
 */
function depthMeasurement(sonarReport: [number], window: number): number {
    let count = 0
    for (let i = 0; i < sonarReport.length - window; i++) {
        if (sonarReport[i + window] > sonarReport[i]) {
            count++
        }
    }
    return count
}