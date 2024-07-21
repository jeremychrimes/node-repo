import {
  createBoard,
  getCellColumnIndex,
  getCellColumnIndexes,
  getCellGroupIndex,
  getCellRowIndex,
  getCellRowIndexes,
  getSudokuGroupIndexes,
  isValidGroupIndex,
} from "./logic";
import {
  GroupIndex,
  ISudokuBoard,
  ISudokuBoardCell,
  SudokuGroup,
  SudokuValue,
} from "./types";
import { validateSudokuGroup } from "./validate";

export function createSudokuBoardCell(cellIndex: number): ISudokuBoardCell {
  return {
    cellIndex,
    rowIndex: getCellRowIndex(cellIndex),
    colIndex: getCellColumnIndex(cellIndex),
    groupIndex: getCellGroupIndex(cellIndex),
    value: "",
    validRow: true,
    validColumn: true,
    validGroup: true,
  };
}

export class SudokuBoard implements ISudokuBoard {
  array: ReadonlyArray<ISudokuBoardCell>;
  constructor(array?: Array<ISudokuBoardCell>) {
    this.array = array ?? createBoard().map((_, i) => createSudokuBoardCell(i));
  }

  updateValue(index: number): (value: SudokuValue | undefined) => ISudokuBoard;
  updateValue(index: number, value?: SudokuValue | undefined): ISudokuBoard;
  /**
   *
   * @param index the index of the cell we want to mutate
   * @returns A callback function that will enable us to provide a value for that cell
   */
  updateValue(index: number, value?: SudokuValue | undefined) {
    return this.ensureValidIndex(index, () => {
      const updateFunc = (value: SudokuValue) => {
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

  getRow(index: GroupIndex): ReadonlyArray<ISudokuBoardCell> {
    return this.ensureValidGroupIndex(index, () =>
      this.array.filter((cell) => cell.rowIndex === index)
    );
  }

  getColumn(columnIndex: GroupIndex): ReadonlyArray<ISudokuBoardCell> {
    return this.ensureValidGroupIndex(columnIndex, () =>
      this.array.filter((cell) => cell.colIndex === columnIndex)
    );
  }

  getGroup(groupIndex: GroupIndex): ReadonlyArray<ISudokuBoardCell> {
    return this.ensureValidGroupIndex(groupIndex, () =>
      this.array.filter((cell) => cell.groupIndex === groupIndex)
    );
  }

  validateBoard(index: number): SudokuBoard {
    return this.ensureValidIndex(index, () => {
      const board = this.validateRow(getCellRowIndex(index))
        .validateColumn(getCellColumnIndex(index))
        .validateGroup(getCellGroupIndex(index));
      return board;
    });
  }

  validateRow(index: GroupIndex): SudokuBoard {
    return this.ensureValidGroupIndex(index, () => {
      const row: SudokuGroup = this.getRow(index).map((cell) => cell.value);
      const isValid = validateSudokuGroup(row);
      const array = this.array.map((cell) => cell);
      getCellRowIndexes(index).forEach((cellIndex) => {
        array[cellIndex] = { ...array[cellIndex], validRow: isValid };
      });

      return new SudokuBoard(array);
    });
  }

  validateColumn(index: GroupIndex): SudokuBoard {
    return this.ensureValidGroupIndex(index, () => {
      const column: SudokuGroup = this.getColumn(index).map(
        (cell) => cell.value
      );
      const isValid = validateSudokuGroup(column);
      const array = this.array.map((cell) => cell);
      getCellColumnIndexes(index).forEach((cellIndex) => {
        array[cellIndex] = { ...array[cellIndex], validColumn: isValid };
      });

      return new SudokuBoard(array);
    });
  }

  validateGroup(index: GroupIndex): SudokuBoard {
    return this.ensureValidGroupIndex(index, () => {
      const group: SudokuGroup = this.getGroup(index).map((cell) => cell.value);
      const isValid = validateSudokuGroup(group);
      const array = this.array.map((cell) => cell);
      getSudokuGroupIndexes(index).forEach((cellIndex) => {
        array[cellIndex] = { ...array[cellIndex], validGroup: isValid };
      });

      return new SudokuBoard(array);
    });
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

  private ensureValidGroupIndex<T>(index: number, callback: () => T): T {
    if (isValidGroupIndex(index)) {
      return callback();
    }
    throw new Error("Invalid group index");
  }
}
