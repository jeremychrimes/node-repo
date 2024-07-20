import {
  createBoard,
  getCellColumnIndex,
  getCellGroupIndex,
  getCellRowIndex,
} from "./logic";

export interface ISudokuBoard<TCellStore, TCellValue> {
  updateValue: (
    index: number,
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

  /**
   *
   * @param index the index of the cell we want to mutate
   * @returns A callback function that will enable us to provide a value for that cell
   */
  updateValue(index: number, value?: undefined | SudokuValue) {
    return this.ensureValidIndex(index, () => {
      const updateFunc = (value: SudokuValue | undefined) => {
        const newMap = this.array.map((x) => x);
        const current = this.array[index];
        if (current === undefined) {
          throw new Error("Value not found");
        }
        newMap[index] = { ...current, value };
        return new SudokuBoard(newMap);
      };

      if (value !== undefined) {
        return updateFunc(value);
      }

      return updateFunc;
    });
  }

  /**
   * Get the value of a sudoku cell.
   * @param index A sudoku cell index
   * @returns The sudoku cell's value
   */
  getCellValue(index: number) {
    // Implement logic to get the value of the cell at the given index
    // Example:
    // return this.cells[index];
    return this.ensureValidIndex(index, () => this.getCell(index).value);
  }

  /**
   * Get the value of a cell with the metadata about the cell's state.
   * @param index A sudoku cell index
   * @returns The cell as a ISudokuBoardCell object
   */
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

  /**
   * Get the array of cells as cell objects.
   * @returns The full sudoku board array as ISudokuBoardCell objects
   */
  getCells(): ReadonlyArray<ISudokuBoardCell> {
    return this.array;
  }

  /**
   * A private method to check the index of a sudoku cell.
   * @param index an index
   * @returns boolean
   */
  private isValidIndex(index: number) {
    return index >= 0 || index > 81;
  }

  /**
   * A private method to ensure that an index is valid and if it is run a
   * callback.
   * @param index a sudoku cell index
   * @param callback a callback that will run if the cell is valid
   * @returns the result of the callback
   */
  private ensureValidIndex(index: number, callback: () => any) {
    if (!this.isValidIndex(index)) {
      throw new Error("Index out of bounds");
    }
    return callback();
  }
}
