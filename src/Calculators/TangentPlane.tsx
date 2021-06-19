import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { parse } from "mathjs";
import { Link } from "react-router-dom";

function TangentPlane() {
  const [textboxval, setTextBoxVal] = useState("");
  const [xval, setxval] = useState("");
  const [yval, setyval] = useState("");
  const [latexval, setLatexVal] = useState("");
  const [latexanswer, setLatexAnswer] = useState(null);

  const eqchange = (e: any) => {
    setTextBoxVal(e.target.value);
    let blockinline: string;
    try {
      blockinline = parse(e.target.value).toTex();
      console.log(blockinline);
    } catch {
      blockinline = parse(`Not a valid input`).toTex();
    }
    setLatexVal(blockinline);
  };

  const sendMath = () => {
    const data = {
      calculator: "tangentplane",
      data: { mathequation: textboxval, point: [xval, yval] },
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
        <br></br>
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
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      {latexanswer !== null ? (
        <>
          <h1>Equation of the Tangent Plane</h1>
          <MathRenderer mathformula={latexanswer.answer} />
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

export default TangentPlane;
