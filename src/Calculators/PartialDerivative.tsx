import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";
import { useLatexPreview } from "../hooks/useLatexPreview";

function PartialDerivative() {
  const [textboxval, setTextBoxVal] = useState("");
  const [respectToBoxVal, setRespectToBoxVal] = useState("");
  const { latexPreview, updatePreview } = useLatexPreview();
  const { result, error, isLoading, calculate } = useCalculator<string>("partial_derivative");

  const eqchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxVal(e.target.value);
    updatePreview(e.target.value);
  };

  return (
    <div className="standard">
      <h3>Partial Derivative</h3>
      <p>
        Write your equation and make sure to include which variable you are
        taking the derivative of with respect to. <i>f</i> refers to the inputted equation. <i>?</i> refers to
        the variable you are taking the derivative of with respect to.
      </p>
      <MathRenderer mathformula="\frac{df}{d ?} (f)" />
      <input
        type="text"
        value={textboxval}
        placeholder="Equation f"
        onChange={eqchange}
      />
      <input
        type="text"
        value={respectToBoxVal}
        placeholder="?"
        maxLength={1}
        onChange={(e) => setRespectToBoxVal(e.target.value)}
        className="smallerTextBox"
      />
      <button
        onClick={() => calculate({ mathequation: textboxval, respectTo: respectToBoxVal })}
        disabled={isLoading}
      >
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <MathRenderer mathformula={latexPreview} />
      <p>With respect to:</p>
      <MathRenderer mathformula={respectToBoxVal} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && <MathRenderer mathformula={result} />}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default PartialDerivative;
