import { useState } from "react";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";
import { Link } from "react-router-dom";

function PartialDerivative() {
  const [textboxval, setTextBoxVal] = useState("");
  const [latexval, setLatexVal] = useState("");
  const [latexanswer, setLatexAnswer] = useState("");
  const [respectToBoxVal, setrespectToBoxVal] = useState("");

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

  const varchange = (e: any) => {
    setrespectToBoxVal(e.target.value);
    let blockinline: string;
    try {
      blockinline = parse(e.target.value).toTex();
      console.log(blockinline);
    } catch {
      blockinline = parse(`Not a valid input`).toTex();
    }
  };

  const sendMath = () => {
    const data = {
      calculator: "partial_derivative",
      data: { mathequation: textboxval, respectTo: respectToBoxVal },
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
        onChange={varchange}
        className="smallerTextBox"
      />
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      <p>With respect to:</p>
      <MathRenderer mathformula={respectToBoxVal}></MathRenderer>
      <MathRenderer mathformula={latexanswer}></MathRenderer>
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default PartialDerivative;
