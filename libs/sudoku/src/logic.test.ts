import { changePos, createBoard } from "./logic";




describe("Logic", () => {
  test("Creation of board", () => {
    const board = createBoard();
    expect(board.length).toBe(81);
  });

  test("Place in cell 0", () => {
    const board = createBoard();

    const newBoard = changePos(board, 0, "1");

    expect(newBoard[0]).toBe("1")
  })
});