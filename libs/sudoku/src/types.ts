export type GroupIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
export interface ISudokuBoard {
  updateValue(index: number): (value: SudokuValue | undefined) => ISudokuBoard;
  updateValue(index: number, value?: SudokuValue | undefined): ISudokuBoard;
  getCellValue: (index: number) => SudokuValue | undefined;
  getCell: (index: number) => ISudokuBoardCell | undefined;
}
export interface ISudokuBoardCell {
  value: SudokuValue | "";
  cellIndex: number;
  rowIndex: number;
  colIndex: number;
  groupIndex: number;
  validRow: boolean;
  validColumn: boolean;
  validGroup: boolean;
}

export type SudokuGroup = Array<SudokuValue>;
