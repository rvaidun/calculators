import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";
import { useLatexPreview } from "../hooks/useLatexPreview";

function Taylor() {
  const [textboxval, setTextBoxVal] = useState("");
  const [xval, setxval] = useState("");
  const [yval, setyval] = useState("");
  const [orderval, setorder] = useState("");
  const { latexPreview, updatePreview } = useLatexPreview();
  const { result, error, isLoading, calculate } = useCalculator<string>("taylor");

  const eqchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxVal(e.target.value);
    updatePreview(e.target.value);
  };

  return (
    <div className="standard">
      <h3>Taylor Polynomial</h3>
      <p>
        This Taylor Polynomial calculator works for multivariable equations. Your input can be f(x, y) or just f(x).
        The Taylor Polynomial can be found using this formula:
      </p>
      <div className="sidebyside2">
        <div className="moveup">
          <MathRenderer mathformula="T_{1}(x, y)=f(x_{0},y_{0})+f_{x}(x_{0},y_{0})(x-x_{0})+f_{y}(x_{0},y_{0})(y-y_{0}) \\" />
        </div>
        <div className="moveup">
          <MathRenderer mathformula="T_{2}(x, y)=f(x_{0},y_{0})+f_{x}(x_{0},y_{0})(x-x_{0})+f_{y}(x_{0},y_{0})(y-y_{0})+\frac{f_{xx}(x_{0},y_{0})}{2}(x-x_{0})^{2}\\+\frac{f_{yy}(x_{0},y_{0})}{2}(y-y_{0})^{2} +f_{xy}(x_{0},y_{0})(x-x_{0})(y - y_{0}) \\" />
        </div>
      </div>
      <p>This calculator can accept orders above 2.</p>
      <input
        type="text"
        value={textboxval}
        placeholder="Equation"
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
      <input
        type="number"
        value={orderval}
        placeholder="Order"
        onChange={(e) => setorder(e.target.value)}
      />
      <button
        onClick={() => calculate({ mathequation: textboxval, point: [xval, yval], order: orderval })}
        disabled={isLoading}
      >
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <MathRenderer mathformula={latexPreview} />
      <p>
        Centered on point: &nbsp;
        <div className="sidebyside">
          <p className="parentheses">(</p>
          <MathRenderer mathformula={xval} />
          <p className="comma">,</p>
          <MathRenderer mathformula={yval} />
          <p className="parentheses">)</p>
        </div>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && (
        <>
          <h1>Taylor Polynomial</h1>
          <MathRenderer mathformula={result} />
        </>
      )}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default Taylor;
