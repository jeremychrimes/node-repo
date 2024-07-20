import { MouseEventHandler, ReactElement, useMemo, useState } from "react";
import { divStyling, tttCell, tttLeaderboard } from "./TikTacToe.css";

export function TicTacToe() {
  const [move, setMove] = useState<number>(0);
  const [cells, setCells] = useState(createArray());
  const player = getMoveCellPlayer(move);

  const winner = useMemo(() => calculateWinner(cells), [cells]);

  const placeMove: (_: number) => MouseEventHandler =
    (i: number) => (event) => {
      event.preventDefault();
      setCells(placeInPosition(cells, player, i));
      setMove((x) => x + 1);
    };

  const resetHandler: React.MouseEventHandler<Element> = () => {
    setMove(0);
    setCells(createArray());
  };

  return (
    <>
      <h1>TicTacToe</h1>
      <div className={tttLeaderboard}>
        {winner ? `${winner} wins` : `${player}'s turn`}
      </div>
      <div className={`${divStyling}`}>
        {cells.map((cell, i) => (
          <Cell key={i} state={cell} onClick={placeMove(i)} />
        ))}
      </div>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
}

type CellProps = {
  children?: React.ReactNode;
  state?: TicTacToeCellState;
  onClick?: React.MouseEventHandler<Element>;
};

function Cell(props: CellProps): ReactElement {
  return (
    <div className={`${tttCell}`} onClick={props.onClick}>
      {props.state}
    </div>
  );
}

export type TicTacToeCellState = "X" | "O" | " ";

function placeInPosition(
  cells: ReadonlyArray<TicTacToeCellState>,
  player: TicTacToeCellState,
  i: number,
): ReadonlyArray<TicTacToeCellState> {
  if (cells[i] != " " || player === undefined) {
    return cells;
  }
  const arrTemp = cells.slice();
  arrTemp[i] = player;
  return arrTemp;
}

function calculateWinner(squares: ReadonlyArray<TicTacToeCellState>) {
  const lines: Array<number[]> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const x = squares[a];
    if (x != " " && squares[b] === x && squares[c] === x) {
      return x;
    }
  }
  return undefined;
}

function getMoveCellPlayer(move: number): TicTacToeCellState {
  if (move % 2 === 0) {
    return "O";
  }
  return "X";
}

function createArray(): ReadonlyArray<TicTacToeCellState> {
  return Array.from(Array(9)).map(() => " ");
}
