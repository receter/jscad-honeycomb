import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import jscadLogo from "./assets/jscad.png";
import "./App.css";
import { JSCADViewer } from "./components/JSCADViewer";
import { honeycomb } from "../lib/main";

function App() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(2);
  const [radius, setRadius] = useState(5);
  const [invert, setInvert] = useState(false);
  const [fillTop, setFillTop] = useState(0);
  const [fillBottom, setFillBottom] = useState(0);
  const [fillLeft, setFillLeft] = useState(0);
  const [fillRight, setFillRight] = useState(0);

  const solids = useMemo(() => {
    return honeycomb({
      rows,
      columns,
      gap,
      radius,
      invert,
      fill: {
        top: fillTop,
        bottom: fillBottom,
        left: fillLeft,
        right: fillRight,
      },
    });
  }, [rows, columns, gap, radius, invert, fillTop, fillBottom, fillLeft, fillRight]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://github.com/jscad/OpenJSCAD.org" target="_blank">
          <img src={jscadLogo} className="logo" alt="JSCAD logo" />
        </a>
      </div>
      <h1>Vite + React + JSCAD</h1>
      <JSCADViewer solids={solids} />
      <div className="card">

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
          <label>Radius: {radius}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={() => setRows((rows) => rows + 1)}>Add Row</button>
          <button onClick={() => setColumns((columns) => columns + 1)}>
            Add Column
          </button>
          <button onClick={() => setGap((gap) => gap + 1)}>Increase Gap</button>
          <button onClick={() => setGap((gap) => Math.max(0.1, gap - 1))}>
            Decrease Gap
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px", alignItems: "center" }}>
          <label>
            <input
              type="checkbox"
              checked={invert}
              onChange={(e) => setInvert(e.target.checked)}
            />
            Invert (Studs)
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxWidth: "400px", margin: "20px auto 0" }}>
          <div>
            <label>Fill Top: {fillTop}</label>
            <input
              type="range" min="0" max={rows} value={fillTop}
              onChange={(e) => setFillTop(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Fill Bottom: {fillBottom}</label>
            <input
              type="range" min="0" max={rows} value={fillBottom}
              onChange={(e) => setFillBottom(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Fill Left: {fillLeft}</label>
            <input
              type="range" min="0" max={columns} value={fillLeft}
              onChange={(e) => setFillLeft(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Fill Right: {fillRight}</label>
            <input
              type="range" min="0" max={columns} value={fillRight}
              onChange={(e) => setFillRight(parseInt(e.target.value))}
            />
          </div>
        </div>

        <p>
          Edit <code>lib/main.ts</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and JSCAD logos to learn more
      </p>
      <a href="https://vitejs.dev/guide/build#library-mode" target="_blank">
        Read the Vite Docs (Library Mode)
      </a>
    </>
  );
}

export default App;
