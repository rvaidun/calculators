import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";
import { useLatexPreview } from "../hooks/useLatexPreview";

function Derivative() {
  const [textboxval, setTextBoxVal] = useState("");
  const { latexPreview, updatePreview } = useLatexPreview();
  const { result, error, isLoading, calculate } = useCalculator<string>("derivative");

  const eqchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxVal(e.target.value);
    updatePreview(e.target.value);
  };

  return (
    <div className="standard">
      <h3>Derivative</h3>
      <p>
        Your equation must have the variable 'x' in it because any other
        variable will be treated as a constant. Please enter your equation in
        the textbox below.
      </p>
      <MathRenderer mathformula="\frac{d}{d x} f" />
      <input
        type="text"
        value={textboxval}
        placeholder="Equation f"
        onChange={eqchange}
      />
      <button onClick={() => calculate({ mathequation: textboxval })} disabled={isLoading}>
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <MathRenderer mathformula={latexPreview} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && <MathRenderer mathformula={result} />}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default Derivative;
