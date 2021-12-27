import React from "react";

// interface props {
//   setActiveArt(index: number): React.Dispatch<React.SetStateAction<number>>;
//   index: number;
// }
interface props {
  setActiveArt: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  activeArt: number;
}
export default function CanvasThumbnail({
  setActiveArt,
  index,
  activeArt,
}: props) {
  function isActive() {
    return index === activeArt;
  }
  return (
    <div
      onClick={() => setActiveArt(index)}
      className={`canvas-thumbnail hover:opacity-80  h-full  ${
        !isActive() ? "bg-slate-400" : "bg-slate-500"
      }`}
    ></div>
  );
}
