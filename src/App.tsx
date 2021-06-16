// import { MouseEventHandler, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import MathRenderer from "./Components/MathRenderer";
// import { parse } from "mathjs";
// Removed switch
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PartialDerivative from "./partial_derivative";
import Discriminant from "./Discriminant";
import Derivative from "./derivative";
import TangentPlane from "./TangentPlane";
import Taylor from "./Taylor";
import NavBar from "./Navbar";
function App() {
  const HomePage = () => (
    <>
      <div className="welcome">
        <h1>Welcome to vcalcs!</h1>
        <p>
          This website is dedicated to building custom niche math calculators
          for students to use. Currently all our calculators are for common
          vector calculus problems but we plan to expand our calculators to more
          areas of math as well.
        </p>
        <p>
          All our calculators were built using the Sympy math library. Sympy is
          a great data science tool that allows you to do complex calculus
          equations easily through python. We are able to parse the equations
          that are sent to sympy through Sympy's built in parser. The front end
          web application is built with React Typescript. To display all the
          math equations we are using MathJax, a library to display math
          equations in the browser
        </p>
        <p>
          You can find a full list of our calculators in the box below. For more
          instructions on how to use all the calculators please visit our{" "}
          <Link to="/help">help</Link> section.
        </p>
      </div>
      <div className="standard">
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
    </>
  );

  const Help = () => (
    <div className="instructions">
      <h1>Instructions</h1>
      <hr />
      <h3>Derivative</h3>
      <p>
        Your equation must have the variable 'x' in it because any other
        variable will be treated as a constant.
      </p>
      <h3>Partial Derivative</h3>
      <p>
        Write your equation and make sure to include which variable you are
        taking the derivative of with respect to.
      </p>
      <h3>Discriminant</h3>
      <p>Your equation must include.</p>
      <h3>Tangent Plane</h3>
      <p>
        Write your equation, make sure to provide two variables ('x' and 'y'
        otherwise other variables will be treated as constants), and an x and y
        value.
      </p>
      <h3>Taylor Polynomial</h3>
      <p>
        This Taylor Polynomial calculator works for multivariable equations.
        Make sure to use 'x' and 'y'.
      </p>
    </div>
  );

  return (
    <Router>
      <NavBar />
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
