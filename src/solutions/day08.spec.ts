import "jasmine"
import {charDiff, countUniqueDigits, decodeValues, equalCharacters} from "./day08"

describe("Day08", () => {
    it("part 1", () => {
        const testData = ["be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
            "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
            "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg"]
        expect(countUniqueDigits(testData)).toBe(8)
    })
    it("part 2", () => {
        const testData = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"
        expect(decodeValues(testData)).toBe(5353)
    })

    describe("Helpers", () => {
        it("char diff function", () => {
            expect(charDiff("abcde", "bd")).toBe("ace")
            expect(charDiff("abc", "")).toBe("abc")
        })
        it("equal characters function", () => {
            expect(equalCharacters("abcde", "edbca")).toBe(true)
            expect(equalCharacters("abcde", "abc")).toBe(false)
            expect(equalCharacters("abcde", "abcba")).toBe(false)
        })
    })
})
