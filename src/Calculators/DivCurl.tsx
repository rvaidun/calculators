import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { parse } from "mathjs";
import { Link } from "react-router-dom";

function DivCurl() {
  const [xval, setxval] = useState("");
  const [yval, setyval] = useState("");
  const [zval, setzval] = useState("");
  const [latexval, setLatexVal] = useState("");
  const [latexanswer, setLatexAnswer] = useState(null);

  const sendMath = () => {
    const data = {
      calculator: "divcurl",
      data: { x: xval, y: yval, z: zval },
    };
    console.log(data);
    fetch("/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLatexAnswer(data);
        console.log(data);
      });
  };
  return (
    <div className="standard">
      <h3>Divergence and Curl</h3>
      <p>
        This Divergence and Curl calculator must take in a 3D function <i>f</i>.
      </p>
        <div className="sidebyside2">
            <div className="moveup">
                <p>The divergence of <i>f</i> can be found with the partial derivative with respect to each variable:</p>
                <MathRenderer mathformula="\nabla  = \frac{\partial }{{\partial x}}\,\,\vec i + \frac{\partial }
                {{\partial y}}\,\,\vec j + \frac{\partial }{{\partial z}}\,\,\vec k"></MathRenderer>
            </div>
            <div className="moveup">
                <p>The curl of <i>f</i> can be found by taking the cross product ∇x<i>f</i>:</p>
                <MathRenderer mathformula="\nabla\times{\bf F} = \left|\matrix{{\bf i}&{\bf j}&{\bf k}\cr
                {\partial \over\partial x}&{\partial
                \over\partial y}&{\partial \over\partial z}\cr
                f&g&h\cr}\right| =
                \left\langle {\partial h\over\partial y}-{\partial g\over\partial z},
                {\partial f\over\partial z}-{\partial h\over\partial x},
                {\partial g\over\partial x}-{\partial f\over\partial y}\right\rangle."></MathRenderer>
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
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      <p>
          f(x, y, z) = &nbsp;
          <div className="sidebyside">
              <p className="parentheses">(</p>&nbsp;
            <MathRenderer mathformula={xval}></MathRenderer>&nbsp;
              <p className="comma">,</p>&nbsp;
            <MathRenderer mathformula={yval}></MathRenderer>&nbsp;
              <p className="comma">,</p>&nbsp;
            <MathRenderer mathformula={zval}></MathRenderer>&nbsp;
              <p className="parentheses">)</p>
          </div>
      </p>
      {latexanswer !== null ? (
        <>
          <h1>Divergence and Curl</h1>
          <MathRenderer mathformula={latexanswer} />
        </>
      ) : (
        ""
      )}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default DivCurl;
