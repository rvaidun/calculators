import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";

function DivCurl() {
  const [xval, setxval] = useState("");
  const [yval, setyval] = useState("");
  const [zval, setzval] = useState("");
  const { result, error, isLoading, calculate } = useCalculator<string[]>("divcurl");

  return (
    <div className="standard">
      <h3>Divergence and Curl</h3>
      <p>
        This Divergence and Curl calculator must take in a 3D function <i>f</i>.
      </p>
      <div className="sidebyside2">
        <div className="moveup">
          <p>The divergence of <i>f</i> can be found with the partial derivative with respect to each variable:</p>
          <MathRenderer mathformula="\nabla  = \frac{\partial }{{\partial x}}\,\,\vec i + \frac{\partial }{{\partial y}}\,\,\vec j + \frac{\partial }{{\partial z}}\,\,\vec k" />
        </div>
        <div className="moveup">
          <p>The curl of <i>f</i> can be found by taking the cross product ∇x<i>f</i>:</p>
          <MathRenderer mathformula="\nabla\times{\bf F} = \left|\matrix{{\bf i}&{\bf j}&{\bf k}\cr {\partial \over\partial x}&{\partial \over\partial y}&{\partial \over\partial z}\cr f&g&h\cr}\right| = \left\langle {\partial h\over\partial y}-{\partial g\over\partial z}, {\partial f\over\partial z}-{\partial h\over\partial x}, {\partial g\over\partial x}-{\partial f\over\partial y}\right\rangle." />
        </div>
      </div>
      <input
        type="text"
        value={xval}
        placeholder="i"
        onChange={(e) => setxval(e.target.value)}
      />
      <input
        type="text"
        value={yval}
        placeholder="j"
        onChange={(e) => setyval(e.target.value)}
      />
      <input
        type="text"
        value={zval}
        placeholder="k"
        onChange={(e) => setzval(e.target.value)}
      />
      <button onClick={() => calculate({ x: xval, y: yval, z: zval })} disabled={isLoading}>
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <p>
        f(x, y, z) = &nbsp;
        <div className="sidebyside">
          <p className="parentheses">(</p>&nbsp;
          <MathRenderer mathformula={xval} />&nbsp;
          <p className="comma">,</p>&nbsp;
          <MathRenderer mathformula={yval} />&nbsp;
          <p className="comma">,</p>&nbsp;
          <MathRenderer mathformula={zval} />&nbsp;
          <p className="parentheses">)</p>
        </div>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && (
        <>
          <h1>Divergence</h1>
          <MathRenderer mathformula={result[0]} />
          <h1>Curl</h1>
          <MathRenderer mathformula={result[1]} />
        </>
      )}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default DivCurl;
