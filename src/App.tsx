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

  const solids = useMemo(() => {
    return honeycomb({
      rows,
      columns,
      gap,
    });
  }, [rows, columns, gap]);

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
        <button onClick={() => setRows((rows) => rows + 1)}>Add Row</button>
        <button onClick={() => setColumns((columns) => columns + 1)}>
          Add Column
        </button>
        <button onClick={() => setGap((gap) => gap + 1)}>Increase Gap</button>
        <button onClick={() => setGap((gap) => Math.max(0.1, gap - 1))}>
          Decrease Gap
        </button>
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
