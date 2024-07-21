import { style } from "@vanilla-extract/css";

const selectedCellColour = "#fffd8d";
const otherSelectedCellColour = "#fffee0";
const errorCellColour = "#ffe0e0";

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
  backgroundColor: selectedCellColour,
});

export const cellAffected = style({
  backgroundColor: otherSelectedCellColour,
});

export const cellError = style({
  backgroundColor: errorCellColour,
});
