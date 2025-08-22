import React from "react";
import "./ControlsPanel.css";

const ControlsPanel = ({ points, setPoints, reset }) => {
  const updatePoint = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index][axis] = Number(value);
    setPoints(newPoints);
  };

  return (
    <div className="controls-panel fade-in">
      <h3 className="panel-title">🎛 Adjust Points</h3>
      {points.map((p, i) => (
        <div key={i} className="point-row">
          <span className="point-label">Point {String.fromCharCode(65 + i)}:</span>
          <div className="slider-group">
            <label>X</label>
            <input
              type="range"
              min="50"
              max="350"
              value={p.x}
              onChange={(e) => updatePoint(i, "x", e.target.value)}
            />
          </div>
          <div className="slider-group">
            <label>Y</label>
            <input
              type="range"
              min="50"
              max="350"
              value={p.y}
              onChange={(e) => updatePoint(i, "y", e.target.value)}
            />
          </div>
        </div>
      ))}
      <button onClick={reset} className="reset-button">
        🔄 Reset Triangle
      </button>
    </div>
  );
};

export default ControlsPanel;
