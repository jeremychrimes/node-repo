import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TicTacToePage, RootPage } from "./Routes";
import { SudokuPage } from "./Routes/SudokuPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/TicTacToe",
    element: <TicTacToePage />,
  },
  {
    path: "/sudoku",
    element: <SudokuPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
