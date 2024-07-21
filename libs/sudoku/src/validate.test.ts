import { SudokuGroup } from "./types";
import { validateSudokuGroup } from "./validate";

describe("validate", () => {
  it("should return true for a valid sudoku group", () => {
    const group: SudokuGroup = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    expect(validateSudokuGroup(group)).toBe(true);
  });

  it("should return false for a sudoku group with duplicate values", () => {
    const group: SudokuGroup = ["1", "1", "3", "4", "5", "6", "7", "8", "9"];
    expect(validateSudokuGroup(group)).toBe(false);
  });

  it("should return true for a empty sudoku group", () => {
    const group: SudokuGroup = ["", "", "", "", "", "", "", "", ""];
    expect(validateSudokuGroup(group)).toBe(true);
  });
});
