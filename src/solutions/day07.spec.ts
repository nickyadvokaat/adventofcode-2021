import "jasmine"
import {calculateMinimalFuel} from "./day07"

describe("CalculateMinimalFuel", () => {
    const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]
    it("should calculate constant fuel usage", () => {
        expect(calculateMinimalFuel(testData, true)).toBe(37)
    })
    it("should calculate increasing fuel usage", () => {
        expect(calculateMinimalFuel(testData, false)).toBe(168)
    })
})
