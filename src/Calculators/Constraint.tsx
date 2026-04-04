import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";
import { useLatexPreview } from "../hooks/useLatexPreview";

function Constraint() {
  const [textboxval, setTextBoxVal] = useState("");
  const [constraintVal, setConstraintBoxVal] = useState("");
  const { latexPreview, updatePreview } = useLatexPreview();
  const { result, error, isLoading, calculate } = useCalculator<string[]>("constraint");

  const eqchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxVal(e.target.value);
    updatePreview(e.target.value);
  };

  return (
    <div className="standard">
      <h3>Min and Max Subject to Constraint</h3>
      <p>
        Provide two equations, one that will be used to find extrema for,
        and one that constraints the first equation. This calculator accepts all
        three variables 'x' 'y' and 'z' although you can choose to use only 'x'
        and 'y'.
      </p>
      <p>
        This can be done without a calculator by using the Lagrange equations.
      </p>
      <MathRenderer mathformula="\nabla f=\lambda\nabla g" />
      <input
        type="text"
        value={textboxval}
        placeholder="Equation f"
        onChange={eqchange}
      />
      <input
        type="text"
        value={constraintVal}
        placeholder="Constraint g"
        onChange={(e) => setConstraintBoxVal(e.target.value)}
      />
      <button
        onClick={() => calculate({ mathequation: textboxval, constraint: constraintVal })}
        disabled={isLoading}
      >
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <MathRenderer mathformula={latexPreview} />
      <p>Subject to constraint: </p>
      <MathRenderer mathformula={constraintVal} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && (
        <>
          <h1>Extrema</h1>
          {result.map((val, i) => (
            <MathRenderer key={i} mathformula={val} />
          ))}
        </>
      )}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default Constraint;
