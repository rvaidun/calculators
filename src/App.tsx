import { MouseEventHandler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PartialDerivative from "./partial_derivative";
import Discriminant from "./Discriminant";
import Derivative from "./derivative";
import TangentPlane from "./TangentPlane";
function App() {
  const HomePage = () => (
    <div className="standard">
      <h1>Homework Helpers</h1>
      <Link to="/derivative">
        <p>Derivative Calculator</p>
      </Link>
      <Link to="/partial-derivative">
        <p>Partial Derivative Calculator</p>
      </Link>
      <Link to="/discriminant">
        <p>Discriminant Calculator</p>
      </Link>
      <Link to="/tangentplane">
        <p>Tangent Plane</p>
      </Link>
      <Link to="/help">
        <p className="smallerText">Help?</p>
      </Link>
    </div>
  );

  const Help = () => (
    <div>
      <h1>Instructions</h1>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={HomePage} />
        <Route path="/derivative" component={Derivative} />
        <Route path="/partial-derivative" component={PartialDerivative} />
        <Route path="/discriminant" component={Discriminant} />
        <Route path="/tangentplane" component={TangentPlane} />
        <Route path="/help" component={Help} />
      </div>
    </Router>
  );
}

export default App;
