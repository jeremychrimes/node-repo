import { SudokuBoard } from "./SudokuBoard";

describe("SudokuBoard", () => {
  it("Creates a sudoku board", () => {
    const b = new SudokuBoard();
    expect(b).toBeInstanceOf(SudokuBoard);
    expect(b.getCellValue(0)).toBeUndefined();
  });

  it("Sets a value of the sudoku board's cell 0", () => {
    const b = new SudokuBoard();
    expect(b.getCellValue(0)).toBeUndefined();
    const c = b.updateValue(0)(1);
    expect(c.getCellValue(0)).toBe(1);
  });

  it("Set the value of the sudoku board's cell 80 to 9", () => {
    const a = new SudokuBoard().updateValue(80)(9);
    expect(a.getCellValue(80)).toBe(9);
  });

  it("Negative index crashes", () => {
    expect(() => new SudokuBoard().getCellValue(-1)).toThrow();
  });
});
