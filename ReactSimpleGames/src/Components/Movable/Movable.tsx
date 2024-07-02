import { useState } from "react";
import { movableStyle } from "./Movable.css";

export function Movable() {
  const [xPos, setXPos] = useState<number>(0);
  const [yPos, setYPos] = useState<number>(0);

  const dragEventHandler: React.DragEventHandler<Element> = (event) => {
    setXPos(event.clientX);
    setYPos(event.clientY);
  };

  return (
    <div className={`${movableStyle}`}>
      <svg width={1000} height={1000}>
        <rect
          x={xPos}
          y={yPos}
          width={250}
          height={250}
          fill="black"
          onDrag={dragEventHandler}
        ></rect>
      </svg>
    </div>
  );
}
