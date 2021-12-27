import { useState } from "react";
import ArtSelectorPanel from "./ArtSelectorPanel";
import CanvasContainer from "./CanvasContainer";

function App() {
  const [activeArt, setActiveArt] = useState(0);
  return (
    <div id="app">
      <CanvasContainer activeArt={activeArt}></CanvasContainer>
      <ArtSelectorPanel activeArt={activeArt} setActiveArt={setActiveArt} />
    </div>
  );
}

export default App;
