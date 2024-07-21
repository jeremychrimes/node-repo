import {
  changePos,
  createBoard,
  getAffectedCellsSetForCellIndex,
  getCellColumnIndexes,
  getCellRowIndexes,
  isValidGroupIndex,
} from "./logic";

describe("Logic", () => {
  test("Creation of board", () => {
    const board = createBoard();
    expect(board.length).toBe(81);
  });

  test("Place in cell 0", () => {
    const board = createBoard();

    const newBoard = changePos(board, 0, "1");

    expect(newBoard[0]).toBe("1");
  });
});

describe("getCellColumnIndexes", () => {
  test("Get column indexes for column 0", () => {
    const columnIndexes = getCellColumnIndexes(0);
    expect(columnIndexes).toEqual(
      expect.arrayContaining([0, 9, 18, 27, 36, 45, 54, 63, 72])
    );
  });

  test("Get column indexes for column 8", () => {
    const columnIndexes = getCellColumnIndexes(8);
    expect(columnIndexes).toEqual(
      expect.arrayContaining([8, 17, 26, 35, 44, 53, 62, 71, 80])
    );
  });
});

describe("getCellColumnIndexes", () => {
  test("Get column indexes for column 0", () => {
    const columnIndexes = getCellColumnIndexes(0);
    expect(columnIndexes).toEqual(
      expect.arrayContaining([0, 9, 18, 27, 36, 45, 54, 63, 72])
    );
  });

  test("Get column indexes for column 1", () => {
    const columnIndexes = getCellColumnIndexes(1);
    expect(columnIndexes).toEqual(
      expect.arrayContaining([1, 10, 19, 28, 37, 46, 55, 64, 73])
    );
  });

  // Add more test cases for other column indexes if needed
});
describe("getCellRowIndexes", () => {
  test("Get row indexes for row 0", () => {
    const rowIndexes = getCellRowIndexes(0);

    expect(rowIndexes).toEqual(
      expect.arrayContaining([0, 1, 2, 3, 4, 5, 6, 7, 8])
    );
  });

  test("Get row indexes for row 1", () => {
    const rowIndexes = getCellRowIndexes(1);
    expect(rowIndexes).toEqual(
      expect.arrayContaining([9, 10, 11, 12, 13, 14, 15, 16, 17])
    );
  });

  // Add more test cases for other row indexes if needed
});
describe("getAffectedCellsSetForCellIndex", () => {
  test("Get affected cells set for cell index 0", () => {
    const affectedCellsSet = getAffectedCellsSetForCellIndex(0);
    expect(affectedCellsSet).toContain(1);
    expect(affectedCellsSet).toContain(9);
    expect(affectedCellsSet).toContain(20);
  });
});

describe("Valid group index", () => {
  test("Group index 0", () => {
    expect(isValidGroupIndex(0)).toBe(true);
  });

  test("Group index 8", () => {
    expect(isValidGroupIndex(8)).toBe(true);
  });

  test("Group index 9", () => {
    expect(isValidGroupIndex(9)).toBe(false);
  });

  test("Group index -1", () => {
    expect(isValidGroupIndex(-1)).toBe(false);
  });
});
