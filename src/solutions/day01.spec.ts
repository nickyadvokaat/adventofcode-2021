import "jasmine"
import {depthMeasurement} from "./day01"

describe("DepthMeasurement", () => {
    const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    it("should measure increments with test window 1", () => {
        expect(depthMeasurement(testData, 1)).toBe(7)
    })
    it("should measure increments with test window 3", () => {
        expect(depthMeasurement(testData, 3)).toBe(5)
    })
})
