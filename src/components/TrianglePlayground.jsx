import React, { useState } from "react";
import "./TrianglePlayground.css";

const TrianglePlayground = ({ points, setPoints }) => {
  const [dragging, setDragging] = useState(null);

  const handleMouseDown = (index) => setDragging(index);
  const handleMouseUp = () => setDragging(null);

  const handleMouseMove = (e) => {
    if (dragging === null) return;

    const svg = e.target.ownerSVGElement;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());

    const newPoints = [...points];
    newPoints[dragging] = { x: cursor.x, y: cursor.y };
    setPoints(newPoints);
  };

  return (
    <div className="triangle-container fade-in">
      <svg
        viewBox="0 0 400 400"
        className="triangle-svg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Grid lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 50}
            x2={400}
            y2={i * 50}
            className="triangle-grid-line"
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1={0}
            x2={i * 50}
            y2={400}
            className="triangle-grid-line"
          />
        ))}

        {/* Triangle polygon */}
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          className="triangle-polygon"
        />

        {/* Draggable points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={10}
            className="triangle-point"
            onMouseDown={() => handleMouseDown(i)}
          />
        ))}
      </svg>
      <p className="drag-hint">Drag the points to change the triangle!</p>
    </div>
  );
};

export default TrianglePlayground;
