import {
  createBoard,
  getCellColumnIndex,
  getCellGroupIndex,
  getCellRowIndex,
} from "./logic";

export interface ISudokuBoard<TCellStore, TCellValue> {
  updateValue: (
    index: number
  ) => (value: TCellValue) => ISudokuBoard<TCellStore, TCellValue>;
  getCellValue: (index: number) => TCellValue;
  getCell: (index: number) => TCellStore;
}
export type SudokuValue =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "";

export interface ISudokuBoardCell {
  value?: SudokuValue | "" | undefined;
  cellIndex: number;
  rowIndex: number;
  colIndex: number;
  groupIndex: number;
}

export function createSudokuBoardCell(cellIndex: number): ISudokuBoardCell {
  return {
    cellIndex,
    rowIndex: getCellRowIndex(cellIndex),
    colIndex: getCellColumnIndex(cellIndex),
    groupIndex: getCellGroupIndex(cellIndex),
    value: "",
  };
}

export class SudokuBoard
  implements ISudokuBoard<ISudokuBoardCell, ISudokuBoardCell>
{
  array: ReadonlyArray<ISudokuBoardCell>;
  constructor(array?: Array<ISudokuBoardCell>) {
    this.array = array ?? createBoard().map((_, i) => createSudokuBoardCell(i));
  }
  updateValue(index: number) {
    return this.ensureValidIndex(
      index,
      () => (value: SudokuValue | undefined) => {
        const newMap = this.array.map((x) => x);
        const current = this.array[index];
        if (current === undefined) {
          throw new Error("Value not found");
        }
        newMap[index] = { ...current, value };
        return new SudokuBoard(newMap);
      }
    );
  }

  getCellValue(index: number) {
    // Implement logic to get the value of the cell at the given index
    // Example:
    // return this.cells[index];
    return this.ensureValidIndex(index, () => this.getCell(index).value);
  }

  getCell(index: number): ISudokuBoardCell {
    // Implement logic to get the cell at the given index
    // Example:
    // const cellValue = this.getCellValue(index);
    // return {
    //   index,
    //   value: cellValue,
    // };
    return this.ensureValidIndex(index, () => this.array[index]);
  }

  getCells(): ReadonlyArray<ISudokuBoardCell> {
    return this.array;
  }

  private isValidIndex(index: number) {
    return index >= 0 || index > 81;
  }

  private ensureValidIndex(index: number, callback: () => any) {
    if (!this.isValidIndex(index)) {
      throw new Error("Index out of bounds");
    }
    return callback();
  }
}
