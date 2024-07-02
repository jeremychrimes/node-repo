import React, { ReactElement, useEffect, useState } from "react";
import { cell, cellSelected, mainGrid, subGrid } from "./Sudoku.css";
import {
  changePos,
  createBoard,
  getSudokuGroupIndexes,
  isSudokuNumber,
} from "@jeremychrimes/sudoku";

export function Sudoku(): ReactElement {
  const [array, setArray] = useState(createBoard());
  const [selectedCell, setSelectedCell] = useState<number | undefined>();

  function setPos(i: number): (_: string) => void {
    return (x: string) => setArray((a) => changePos(a, i, x));
  }

  function toggleSelected(i: number): () => void {
    return () => {
      return setSelectedCell((s) => (i === s ? undefined : i));
    };
  }

  const commonProps: Omit<SubGridProps, "index"> = {
    arr: array,
    setPos: setPos,
    selectedCell: selectedCell,
    toggleSelected: toggleSelected,
  };

  return (
    <React.Fragment>
      <>{selectedCell}</>
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
};

function SubGrid({
  arr,
  index,
  setPos,
  toggleSelected,
  selectedCell,
}: SubGridProps) {
  return (
    <div className={subGrid}>
      {getSudokuGroupIndexes(index).map((x) => (
        <Cell
          key={x as number}
          value={arr[x]}
          setValue={setPos(x)}
          toggleSelect={toggleSelected(x)}
          selected={selectedCell === x}
        />
      ))}
    </div>
  );
}

type CellProps = {
  setValue: (x: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  toggleSelect: () => void;
  selected: boolean;
};

function Cell({ value, toggleSelect, selected, setValue }: CellProps) {
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
      className={`${cell} ${selected ? cellSelected : ""}`}
      onClick={toggleSelect}
    >
      {value}
    </div>
  );
}
