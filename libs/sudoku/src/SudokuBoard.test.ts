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
    const a = new SudokuBoard().updateValue(80)("9");
    expect(a.getCellValue(80)).toBe("9");
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

  it("getCell when called with index 40 returns properly", () => {
    const b = new SudokuBoard();
    const cell = b.getCell(40);

    expect(cell.colIndex).toBe(4);
    expect(cell.rowIndex).toBe(4);
    expect(cell.groupIndex).toBe(4);
  });

  it("getRow when called with index 4 has correct values", () => {
    const b = new SudokuBoard();
    const row = b.getRow(4);

    expect(row?.length).toBe(9);
    expect(row[0].rowIndex).toBe(4);
    expect(row[0].colIndex).toBe(0);
    expect(row[0].groupIndex).toBe(3);

    expect(row[8].rowIndex).toBe(4);
  });

  it("getColumn when called with index 4 has correct values", () => {
    const b = new SudokuBoard();
    const column = b.getColumn(4);

    expect(column?.length).toBe(9);
    expect(column[0].colIndex).toBe(4);
    expect(column[0].rowIndex).toBe(0);
    expect(column[0].groupIndex).toBe(1);

    expect(column[8].colIndex).toBe(4);
  });

  it("getGroup when called with index 4 has correct values", () => {
    const b = new SudokuBoard();
    const group = b.getGroup(4);

    expect(group?.length).toBe(9);
    expect(group[0].groupIndex).toBe(4);
    expect(group[0].rowIndex).toBe(3);
    expect(group[0].colIndex).toBe(3);

    expect(group[8].groupIndex).toBe(4);
  });
});
