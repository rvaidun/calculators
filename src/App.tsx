import { MouseEventHandler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PartialDerivative from "./partial_derivative";
import Discriminant from "./Discriminant";

function App() {
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
      <Link to="/discriminant">
        <p>Discriminant Calculator</p>
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
        <Route path="/discriminant" component={Discriminant} />
      </div>
    </Router>
  );
}

export default App;
