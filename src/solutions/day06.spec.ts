import "jasmine"
import {numberOfFish} from "./day06"

describe("NumberOfFish", () => {
    const testData = [3, 4, 3, 1, 2]
    it("should calculate number of fish after 80 days", () => {
        expect(numberOfFish(testData, 80)).toBe(5934)
    })
    it("should calculate number of fish after 256 days", () => {
        expect(numberOfFish(testData, 256)).toBe(26984457539)
    })
})
