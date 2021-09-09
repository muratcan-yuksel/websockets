import React from "react";
import FirstPart from "./components/FirstPart";
import SecondPart from "./components/SecondPart";
import ThirdPart from "./components/ThirdPart";
import LastPart from "./components/LastPart";
import "./style/app.css";

function App() {
  return (
    <div className="App">
      <div className="splitScreen">
        <div className="topPane">
          <FirstPart />
        </div>
        <div className="secondPane">
          <SecondPart />
        </div>
        <div className="middlePane">
          <LastPart />
          <ThirdPart />
        </div>
      </div>
    </div>
  );
}

export default App;
