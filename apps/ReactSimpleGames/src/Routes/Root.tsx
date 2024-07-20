import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function RootPage(): ReactElement {
  return <Link to={"/TicTacToe"}>TicTacToe</Link>;
}
