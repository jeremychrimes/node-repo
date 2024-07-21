import { SudokuGroup, SudokuValue } from "./types";

export function isSudokuGroup(
  sudokuGroup: Array<unknown>
): sudokuGroup is SudokuGroup {
  return sudokuGroup.length === 9 && sudokuGroup.every(isSudokuValue);
}

export function isSudokuValue(value: unknown): value is SudokuValue {
  return (
    typeof value === "string" &&
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value)
  );
}

export function validateSudokuGroup(sudokuGroup: SudokuGroup): boolean {
  return (
    sudokuGroup.filter((value) => value !== "").length ===
    new Set(sudokuGroup.filter((value) => value !== "")).size
  );
}
