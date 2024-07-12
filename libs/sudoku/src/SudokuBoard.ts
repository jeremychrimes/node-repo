import { createBoard } from "./logic";

export interface ISudokuBoard<TCellStore, TCellValue> {
  updateValue: (
    index: number
  ) => (value: TCellValue) => ISudokuBoard<TCellStore, TCellValue>;
  getCellValue: (index: number) => TCellValue;
  getCell: (index: number) => TCellValue;
}

export class SudokuBoard implements ISudokuBoard<number, number | undefined> {
  map: Map<number, number | undefined>;
  constructor(map?: Map<number, number | undefined>) {
    this.map =
      map ??
      new Map<number, number | undefined>(
        createBoard().map((_, i) => [i, undefined])
      );
  }
  updateValue(index: number) {
    return this.ensureValidIndex(index, () => (value: number | undefined) => {
      // Implement logic to update the value of the cell at the given index
      // Return a new instance of SudokuBoard with the updated value
      // You can use the spread operator (...) to clone the current board and modify the specific cell
      // Example:
      // const updatedBoard = { ...this };
      // updatedBoard.cells[index] = value;
      // return updatedBoard;
      const newMap = new Map(this.map);
      newMap.set(index, value);
      return new SudokuBoard(newMap);
    });
  }

  getCellValue(index: number) {
    // Implement logic to get the value of the cell at the given index
    // Example:
    // return this.cells[index];
    return this.ensureValidIndex(index, () => this.map.get(index));
  }

  getCell(index: number) {
    // Implement logic to get the cell at the given index
    // Example:
    // const cellValue = this.getCellValue(index);
    // return {
    //   index,
    //   value: cellValue,
    // };
    return this.ensureValidIndex(index, () => this.map.get(index));
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
