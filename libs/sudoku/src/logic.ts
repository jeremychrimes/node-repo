type CellValue = string | undefined;
type Board = CellValue[];

const BOARD_SIZE = 9;

function isCellValue(value: unknown): value is CellValue {
  return value === undefined || isSudokuNumber(value);
}

function isBoard(array: Array<unknown>): array is Board {
  return array.length === 81 && array.every(isCellValue);
}

function isValidIndex(index: number): boolean {
  return index >= 0 && index < 81;
}


const _indexes = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

export function getSudokuGroupIndexes(
  groupIndex: number | undefined = undefined,
): number[] {
  if (groupIndex != undefined && groupIndex >= 0 && groupIndex < 9) {
    return _indexes[groupIndex];
  }

  throw new Error("Index out of bounds");
}

export function isSudokuNumber(value: unknown): boolean {
  return (
    typeof value === "string" &&
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value)
  );
}

export function getCellColumnIndex(cellIndex: number): number {
  return cellIndex % 9;
}

export function getCellRowIndex(cellIndex: number): number {
  return Math.floor(cellIndex / BOARD_SIZE);
}

export function getCellGroupIndex(cellIndex: number): number {
  return _indexes.findIndex((x) => x.includes(cellIndex));
}

export function createBoard(): Board {
  return Array.from(Array(81)).map(() => undefined);
}

export function changePos(
  array: Board,
  index: number,
  value: CellValue,
): Board {
  if (!isCellValue(value)) {
    throw new Error("Invalid value");
  }

  if (!isBoard(array)) {
    throw new Error("Invalid board");
  }

  if (!isValidIndex(index)) {
    throw new Error("Invalid index");
  }

  const newArray = array.slice();
  newArray[index] = value;
  return newArray;
}
