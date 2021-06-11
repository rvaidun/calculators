import { MouseEventHandler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PartialDerivative from "./partial_derivative";

function App() {
  // const [textboxval, setTextBoxVal] = useState("");
  // const [latexval, setLatexVal] = useState("");
  // const [latexanswer, setLatexAnswer] = useState("");
  //
  // const eqchange = (e: any) => {
  //   setTextBoxVal(e.target.value);
  //   let blockinline: string;
  //   try {
  //     blockinline = parse(e.target.value).toTex();
  //     console.log(blockinline);
  //   } catch {
  //     blockinline = parse(`error`).toTex();
  //   }
  //   setLatexVal(blockinline);
  // };

  const HomePage = () => (
    <div>
      <h1>Welcome to Calculators</h1>
      <h3>Derivative</h3>
      <Link to="/derivative">
        <p>Derivative Calculator</p>
      </Link>
      <Link to="/partial-derivative">
        <p>Partial Derivative Calculator</p>
      </Link>
      <Link to="/help">
        <p className="smaller">Help?</p>
      </Link>
    </div>
  );

  const Help = () => (
    <div>
      <h1>Instructions</h1>
    </div>
  );

  const sendPartialDeriv = (e: any) => {
    fetch("/partial-derivative", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={HomePage} />
        <Route path="/partial-derivative" component={PartialDerivative} />
        <Route path="/help" component={Help} />
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
      </div>
    </Router>
  );
}

export default App;
