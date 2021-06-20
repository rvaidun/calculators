// import { MouseEventHandler, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import MathRenderer from "./Components/MathRenderer";
// import { parse } from "mathjs";
// Removed switch
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Derivative from "./Calculators/Derivative";
import PartialDerivative from "./Calculators/PartialDerivative";
import Discriminant from "./Calculators/Discriminant";
import TangentPlane from "./Calculators/TangentPlane";
import Taylor from "./Calculators/Taylor";
import Constraint from "./Calculators/Constraint";
import DivCurl from "./Calculators/DivCurl";
import NavBar from "./Navbar";
function App() {
  const HomePage = () => (
    <>
      <div className="imagebackground">
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
              <p>Derivative</p>
            </Link>
            <Link to="/partial-derivative">
              <p>Partial Derivative</p>
            </Link>
            <Link to="/discriminant">
              <p>Discriminant</p>
            </Link>
            <Link to="/tangentplane">
              <p>Tangent Plane</p>
            </Link>
            <Link to="/taylor">
              <p>Taylor Polynomial</p>
            </Link>
            <Link to="/constraint">
              <p>Min and Max Subject to Constraint</p>
            </Link>
            <Link to="/divcurl">
              <p>Divergence and Curl</p>
            </Link>
            <Link to="/help">
              <p className="smallerText">Help</p>
            </Link>
            <Link to="/donate">
              <p className="smallerText">Donate</p>
            </Link>
          </div>
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
        taking the derivative of with respect to. <i>f</i> refers to the inputted equation. <i>?</i> refers to
        the variable you are taking the derivative of with respect to.
      </p>
      <h3>Discriminant</h3>
      <p>
        You must provide an equation that can be derived multiple times with
        respect to variables 'x' and 'y'. Otherwise, your answer will be
        provided as a zero. This is because in order to find the critical points
        of a given function, you need to be able to take second partial
        derivatives.
      </p>
      <h3>Tangent Plane</h3>
      <p>
        This calculator finds the equation for a tangent plane to the graph of f(x, y) (your input) at a given point
        (also your input). Make sure to use variables 'x' and 'y' and include a valid x and y value for the point.
      </p>
      <h3>Taylor Polynomial</h3>
      <p>
        This Taylor Polynomial calculator works for multivariable equations.
        Your input can be f(x, y) or just f(x).
      </p>
      <h3>Min and Max Subject to Constraint</h3>
      <p>
        Provide two equations, one that will be used to find extrema for,
        and one that constraints the first equation. This calculator accepts all
        three variables 'x' 'y' and 'z' although you can choose to use only 'x'
        and 'y'.
      </p>
    </div>
  );

  const Donate = () => (
      <div className="standard">
        <h3>If you would like to see more calculators and improvements for the current ones, consider donating. You can
          support this website with just $1. If you choose to donate you can send us an email and request a calculator
          be made. We will try our best to fulfill these requests.</h3>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="business" value="WHA5JTF556R44" />
        <input type="hidden" name="no_recurring" value="0" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" className="donationborder" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        </form>
          <h4>vectorcalcs@gmail.com</h4>
        <h2>Thank you!</h2>
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
        <Route path="/constraint" component={Constraint} />
        <Route path="/divcurl" component={DivCurl} />
        <Route path="/help" component={Help} />
        <Route path="/donate" component={Donate} />
      </div>
    </Router>
  );
}

export default App;
