import { globalStyle, style } from "@vanilla-extract/css";

export const divStyling = style({
  display: "grid",
  padding: "8px",
  gap: "12px",
  gridTemplateColumns: "repeat(3, 1fr)",
  width: "200px",
});

export const tttCell = style({
  border: "2px solid black",
  fontSize: "24px",
  display: "inline-block",
  padding: "8px",
  width: "24px",
  height: "24px",
  alignContent: "center",
  textAlign: "center",
});

globalStyle(`${tttCell}:hover`, {
  border: "2px solid red",
});

export const tttLeaderboard = style({
  fontSize: "24px",
  textAlign: "center",
  border: "2px solid #f0f0f0",
  width: "200px",
});
