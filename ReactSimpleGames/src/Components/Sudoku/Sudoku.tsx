import React, { ReactElement, useEffect, useState } from "react";
import {
  cell,
  cellAffected,
  cellSelected,
  mainGrid,
  subGrid,
} from "./Sudoku.css";
import {
  changePos,
  createBoard,
  getAffectedCellsSetForCellIndex,
  getCellColumnIndex,
  getCellGroupIndex,
  getCellRowIndex,
  getSudokuGroupIndexes,
  isSudokuNumber,
} from "@jeremychrimes/sudoku";

export function Sudoku(): ReactElement {
  const [array, setArray] = useState(createBoard());
  const [selectedCell, setSelectedCell] = useState<number | undefined>();

  const affectedCells =
    selectedCell != undefined
      ? getAffectedCellsSetForCellIndex(selectedCell)
      : undefined;

  function setPos(i: number): (_: string) => void {
    return (x: string) => setArray((a) => changePos(a, i, x));
  }

  function toggleSelected(i: number): () => void {
    return () => {
      return setSelectedCell((s) => (i === s ? undefined : i));
    };
  }

  const selectedRowIndex = selectedCell
    ? getCellRowIndex(selectedCell)
    : undefined;

  const selectedColumnIndex = selectedCell
    ? getCellColumnIndex(selectedCell)
    : undefined;

  const selectedGroupIndex = selectedCell
    ? getCellGroupIndex(selectedCell)
    : selectedCell;

  const commonProps: Omit<SubGridProps, "index"> = {
    arr: array,
    setPos: setPos,
    selectedCell: selectedCell,
    toggleSelected: toggleSelected,
    affectedCells: affectedCells,
  };

  return (
    <React.Fragment>
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
      <>{selectedCell}</>
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
  arr: (string | undefined)[];
  index: number;
  setPos: setPosType;
  toggleSelected: (i: number) => () => void;
  selectedCell: number | undefined;
  affectedCells?: Set<number>;
};

export function SubGrid({
  arr,
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
          value={arr[x]}
          setValue={setPos(x)}
          toggleSelect={toggleSelected(x)}
          selected={selectedCell === x}
          affected={affectedCells?.has(x) ?? false}
          index={x as number}
        />
      ))}
    </div>
  );
}

type CellProps = {
  setValue: (x: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: string;
  toggleSelect: () => void;
  selected: boolean;
  affected: boolean;
  index: number;
};

export function SudokuCell({
  value,
  toggleSelect,
  selected,
  setValue,
  affected,
}: CellProps) {
  useEffect(() => {
    const listenter = (event: KeyboardEvent) => {
      const key = event.key;
      if (isSudokuNumber(key)) {
        setValue(key);
      }
    };
    selected && document.addEventListener("keypress", listenter, {});
    return () => {
      document.removeEventListener("keypress", listenter);
    };
  }, [selected, toggleSelect, setValue, value]);

  return (
    <div
      tabIndex={0}
      className={`${cell} ${selected ? cellSelected : affected ? cellAffected : ""}`}
      onClick={toggleSelect}
    >
      {value}
    </div>
  );
}
