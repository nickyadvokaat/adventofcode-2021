import "jasmine"
import {lifeSupportRating, powerConsumption} from "./day03"

describe("Day03", () => {
    const testData = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"]
    it("should calculate the power consumption", () => {
        expect(powerConsumption(testData)).toBe(198)
    })
    it("should calculate the life support rating", () => {
        expect(lifeSupportRating(testData)).toBe(230)
    })
})
