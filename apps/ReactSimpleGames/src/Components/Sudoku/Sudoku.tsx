import React, { ReactElement, useEffect, useState } from "react";
import {
  cell,
  cellAffected,
  cellSelected,
  mainGrid,
  subGrid,
} from "./Sudoku.css";
import {
  getAffectedCellsSetForCellIndex,
  getSudokuGroupIndexes,
  isSudokuNumber,
  ISudokuBoard,
  ISudokuBoardCell,
  SudokuBoard,
  SudokuValue,
} from "@jeremychrimes/sudoku";

export function Sudoku(): ReactElement {
  const [board, setBoard] = useState<ISudokuBoard>(new SudokuBoard());
  const [selectedCellIndex, setSelectedCell] = useState<number | undefined>();

  console.log({ board });

  const affectedCells =
    selectedCellIndex != undefined
      ? getAffectedCellsSetForCellIndex(selectedCellIndex)
      : undefined;

  function setPos(i: number): (_: string) => void {
    return (x: string) =>
      setBoard((board) => board.updateValue(i, x as SudokuValue));
  }

  function toggleSelected(i: number): () => void {
    return () => {
      return setSelectedCell((s) => (i === s ? undefined : i));
    };
  }

  const selectedCell =
    selectedCellIndex != undefined
      ? board.getCell(selectedCellIndex)
      : undefined;
  const selectedRowIndex = selectedCell?.rowIndex;
  const selectedColumnIndex = selectedCell?.colIndex;
  const selectedGroupIndex = selectedCell?.groupIndex;

  const commonProps: Omit<SubGridProps, "index"> = {
    board: board,
    setPos: setPos,
    selectedCell: selectedCellIndex,
    toggleSelected: toggleSelected,
    affectedCells: affectedCells,
  };

  return (
    <React.Fragment>
      <h1>Sudoku</h1>
      <div className={mainGrid}>
        <SubGrid {...commonProps} index={0} />
        <SubGrid {...commonProps} index={1} />
        <SubGrid {...commonProps} index={2} />
        <SubGrid {...commonProps} index={3} />
        <SubGrid {...commonProps} index={4} />
        <SubGrid {...commonProps} index={5} />
        <SubGrid {...commonProps} index={6} />
        <SubGrid {...commonProps} index={7} />
        <SubGrid {...commonProps} index={8} />
      </div>
      <>{selectedCellIndex}</>
      <br></br>
      <>Column {selectedColumnIndex}</>
      <br />
      <>Row {selectedRowIndex}</>
      <br />
      <>Group {selectedGroupIndex}</>
    </React.Fragment>
  );
}

type setPosType = (i: number) => (x: string) => void;

type SubGridProps = {
  index: number;
  setPos: setPosType;
  toggleSelected: (i: number) => () => void;
  selectedCell: number | undefined;
  affectedCells?: Set<number>;
  board: ISudokuBoard;
};

export function SubGrid({
  board,
  index,
  setPos,
  toggleSelected,
  selectedCell,
  affectedCells,
}: SubGridProps) {
  return (
    <div className={subGrid}>
      {getSudokuGroupIndexes(index).map((x) => (
        <SudokuCell
          key={x as number}
          setValue={setPos(x)}
          toggleSelect={toggleSelected(x)}
          selected={selectedCell === x}
          affected={affectedCells?.has(x) ?? false}
          index={x as number}
          cellVm={board.getCell(x)}
        />
      ))}
    </div>
  );
}

type CellProps = {
  setValue: (x: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleSelect: () => void;
  selected: boolean;
  affected: boolean;
  index: number;
  cellVm: ISudokuBoardCell;
};

export function SudokuCell({
  toggleSelect,
  selected,
  setValue,
  affected,
  cellVm,
}: CellProps) {
  useEffect(() => {
    const listenter = (event: KeyboardEvent) => {
      const key = event.key;
      if (isSudokuNumber(key)) {
        setValue(key);
      } else if (key.toUpperCase() != key.toLowerCase()) {
        setValue("");
      }
    };
    selected && document.addEventListener("keypress", listenter, {});
    return () => {
      document.removeEventListener("keypress", listenter);
    };
  }, [selected, toggleSelect, setValue, cellVm]);

  return (
    <div
      tabIndex={0}
      className={`${cell} ${selected ? cellSelected : affected ? cellAffected : ""}`}
      onClick={toggleSelect}
    >
      {cellVm.value}
    </div>
  );
}
