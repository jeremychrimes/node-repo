import { SudokuBoard } from "./SudokuBoard";

describe("SudokuBoard", () => {
  const defaulCellValue = "";
  it("Creates a sudoku board", () => {
    const b = new SudokuBoard();
    expect(b).toBeInstanceOf(SudokuBoard);
    expect(b.getCellValue(0)).toBe(defaulCellValue);
  });

  it("Sets a value of the sudoku board's cell 0", () => {
    const b = new SudokuBoard();
    expect(b.getCellValue(0)).toBe(defaulCellValue);
    const c = b.updateValue(0)("1");
    expect(c.getCellValue(0)).toBe("1");
  });

  it("Sets a value of the sudoku board's cell 0 using the un-curried updateValue function", () => {
    const b = new SudokuBoard();
    expect(b.getCellValue(0)).toBe("");
    const c = b.updateValue(0, "5");
    expect(c.getCellValue(0)).toBe("5");
  });

  it("Set the value of the sudoku board's cell 80 to 9", () => {
    const a = new SudokuBoard().updateValue(80)(9);
    expect(a.getCellValue(80)).toBe(9);
  });

  it("Negative index crashes", () => {
    expect(() => new SudokuBoard().getCellValue(-1)).toThrow();
  });

  it("getCell when called with index 0 returns properly", () => {
    const b = new SudokuBoard();
    const cell = b.getCell(0);

    expect(cell.colIndex).toBe(0);
    expect(cell.rowIndex).toBe(0);
    expect(cell.groupIndex).toBe(0);
  });

  it("getCell when called with index 80 returns properly", () => {
    const b = new SudokuBoard();
    const cell = b.getCell(80);

    expect(cell.colIndex).toBe(8);
    expect(cell.rowIndex).toBe(8);
    expect(cell.groupIndex).toBe(8);
  });
});
