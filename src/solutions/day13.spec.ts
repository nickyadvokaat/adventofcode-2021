import "jasmine"
import {Coord, TransparentPaper} from "./day13"

describe("TransparentPaper", () => {
    it("test folding the paper", () => {
        const transparentPaper = new TransparentPaper()
        transparentPaper.mark(new Coord(0, 0))
        transparentPaper.mark(new Coord(0, 5))
        transparentPaper.mark(new Coord(0, 6))
        transparentPaper.mark(new Coord(1, 5))
        transparentPaper.mark(new Coord(1, 8))
        transparentPaper.mark(new Coord(3, 0))
        transparentPaper.mark(new Coord(4, 6))
        transparentPaper.mark(new Coord(5, 1))
        expect(transparentPaper.numberOfDots()).toBe(8)
        transparentPaper.fold("y", 3)
        expect(transparentPaper.numberOfDots()).toBe(6)
        transparentPaper.fold("x", 2)
        expect(transparentPaper.numberOfDots()).toBe(4)
    })
})
