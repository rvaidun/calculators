import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";
import { useLatexPreview } from "../hooks/useLatexPreview";
import { TangentPlaneResponse } from "../types";

function TangentPlane() {
  const [textboxval, setTextBoxVal] = useState("");
  const [xval, setxval] = useState("");
  const [yval, setyval] = useState("");
  const { latexPreview, updatePreview } = useLatexPreview();
  const { result, error, isLoading, calculate } = useCalculator<TangentPlaneResponse>("tangentplane");

  const eqchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxVal(e.target.value);
    updatePreview(e.target.value);
  };

  return (
    <div className="standard">
      <h3>Equation for a tangent plane</h3>
      <p>
        This calculator finds the equation for a tangent plane to the graph of f(x, y) (your input) at a given point
        (also your input). Make sure to use variables 'x' and 'y' and include a valid x and y value for the point.
      </p>
      <p>
        This is done by taking the partial derivative of f(x, y) with respect to variables x and y separately, then
        plugging in the given point for each partial derivative. Then, f(x, y) is evaluated at the given point
        and the tangent plane is constructed.
      </p>
      <div className="sidebyside">
        <MathRenderer className="sidebyside" mathformula="\frac{df}{d x}" />
        &nbsp;&nbsp;
        <MathRenderer className="sidebyside2" mathformula="\frac{df}{d y}" />
      </div>
      <br />
      <input
        type="text"
        value={textboxval}
        placeholder="Equation f(x, y)"
        onChange={eqchange}
      />
      <input
        type="number"
        value={xval}
        placeholder="X value"
        onChange={(e) => setxval(e.target.value)}
      />
      <input
        type="number"
        value={yval}
        placeholder="Y value"
        onChange={(e) => setyval(e.target.value)}
      />
      <button
        onClick={() => calculate({ mathequation: textboxval, point: [xval, yval] })}
        disabled={isLoading}
      >
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <MathRenderer mathformula={latexPreview} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && (
        <>
          <h1>Equation of the Tangent Plane</h1>
          <MathRenderer mathformula={result.answer} />
        </>
      )}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default TangentPlane;
