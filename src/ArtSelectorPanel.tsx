import CanvasThumbnail from "./CanvasThumbnail";
// interface props {
//   setActiveArt(
//     num: React.Dispatch<React.SetStateAction<number>>
//   ): React.Dispatch<React.SetStateAction<number>>;
// }
interface props {
  setActiveArt: React.Dispatch<React.SetStateAction<number>>;
  activeArt: number;
}
export default function ArtSelectorPanel({ setActiveArt, activeArt }: props) {
  return (
    <div
      id="art-selector-panel"
      className="border-2 rounded-md p-2 flex justify-center items-center  "
    >
      {Array(7)
        .fill(0)
        .map((num, index) => {
          return (
            <CanvasThumbnail
              key={index}
              setActiveArt={setActiveArt}
              index={index}
              activeArt={activeArt}
            />
          );
        })}
    </div>
  );
}
