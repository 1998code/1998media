import React from "react";

type Props = {
  id: number;
  color: string;
  x: number;
  y: number;
};

export default function Cursor({ id, color, x, y }: Props) {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, transform: `translateX(${x}px) translateY(${y}px)`, }} >
      <i className="fa fa-location-arrow text-xl -rotate-90" style={{color: color}} />
      <span className={`-mt-2.5 ml-3 px-2 block rounded-full p-1 font-semibold bg-white dark:bg-black dark:text-white border text-xs`}>
        <i className="fa fa-circle-user mr-1" />
        Guest { id }
      </span>
    </div>
  );
}
