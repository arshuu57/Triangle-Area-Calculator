import { useState } from "react";
import TrianglePlayground from "./components/TrianglePlayground";
import FormulaView from "./components/FormulaView";
import ControlsPanel from "./components/ControlsPanel";
import Challenges from "./components/Challenges";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [points, setPoints] = useState([
    { x: 100, y: 300 },
    { x: 300, y: 300 },
    { x: 200, y: 100 },
  ]);

  const area = Math.abs(
    (points[0].x * (points[1].y - points[2].y) +
      points[1].x * (points[2].y - points[0].y) +
      points[2].x * (points[0].y - points[1].y)) /
      2
  );

  const reset = () =>
    setPoints([
      { x: 100, y: 300 },
      { x: 300, y: 300 },
      { x: 200, y: 100 },
    ]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Area of Triangles</h1>
        <p className="subtitle">An Interactive Learning Module</p>
      </header>

      <main className="main-content">
        {/* Main Grid */}
        <div className="layout-grid">
          {/* Left section */}
          <section className="left-column fade-in">
            <TrianglePlayground points={points} setPoints={setPoints} />
            <p className="area-display">
              Current Area: <span>{area.toFixed(2)}</span> sq units
            </p>
          </section>

          {/* Right section */}
          <aside className="right-column fade-in">
            <ControlsPanel points={points} setPoints={setPoints} reset={reset} />
            <FormulaView />
          </aside>
        </div>

        {/* Bottom section */}
        <div className="bottom-section fade-in">
          <Challenges currentArea={area} />
          <Quiz />
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ for Interactive Learning</p>
      </footer>
    </div>
  );
}

export default App;
