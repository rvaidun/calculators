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
import Taylor from "./Taylor";
function App() {
  const HomePage = () => (
    <div className="standard">
      <h1>VCalcs</h1>
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
      <Link to="/taylor">
        <p>Taylor Polynomial</p>
      </Link>
      <Link to="/help">
        <p className="smallerText">Help</p>
      </Link>
      <Link to="/help">
        <p className="smallerText">Donate</p>
      </Link>
    </div>
  );

  const Help = () => (
    <div className="instructions">
      <h1>Instructions</h1>
      <hr/>
      <h3>Derivative</h3>
      <p>Your equation must have the variable 'x' in it because any other variable will be treated
      as a constant.</p>
      <h3>Partial Derivative</h3>
      <p>Write your equation and make sure to include which variable you are taking the derivative of with respect
      to.</p>
      <h3>Discriminant</h3>
      <p>Your equation must include.</p>
      <h3>Tangent Plane</h3>
      <p>Write your equation, make sure to provide two variables ('x' and 'y' otherwise other variables will be treated
      as constants), and an x and y value.</p>
      <h3>Taylor Polynomial</h3>
      <p>This Taylor Polynomial calculator works for multivariable equations. Make sure to use 'x' and 'y'.</p>
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
        <Route path="/taylor" component={Taylor} />
        <Route path="/help" component={Help} />
      </div>
    </Router>
  );
}

export default App;
