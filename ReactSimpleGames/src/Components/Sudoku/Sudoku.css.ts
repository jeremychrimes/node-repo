import { style } from "@vanilla-extract/css";

export const mainGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "4px",
  backgroundColor: "black",
  width: "min-content",
  padding: "4px",
});

export const subGrid = style({
  width: "min-content",
  height: "auto",
  display: "grid",
  backgroundColor: "red",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2px",
});

export const cell = style({
  backgroundColor: "white",
  width: "40px",
  height: "40px",
  alignContent: "center",
  textAlign: "center",
});

export const cellSelected = style({
  backgroundColor: "yellow",
});
