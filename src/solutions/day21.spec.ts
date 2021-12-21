import "jasmine"
import {diracDice} from "./day21"

describe("Day21", () => {
    it("Test Dirac Dice", () => {
        expect(diracDice([4, 8])).toEqual([444356092776315, 341960390180808])
    })
})
