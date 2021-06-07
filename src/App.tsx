import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
function App() {
  const [textboxval, setTextBoxVal] = useState("");
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <input
        type="text"
        value={textboxval}
        onChange={(e) => setTextBoxVal(e.target.value)}
      />
      <MathRenderer mathformula={textboxval}></MathRenderer>
    </div>
  );
}

export default App;
