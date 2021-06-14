import { MouseEventHandler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import App from "./App";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";

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
      data: { mathequation: textboxval , respectTo: respectToBoxVal},

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
        <input type="text" value={textboxval} onChange={eqchange} />
        <input type="text" value={respectToBoxVal} maxLength={1} onChange={varchange} className="smallerTextBox" />
        <button onClick={sendMath}>Go</button>
        <MathRenderer mathformula={latexval}></MathRenderer>
          <p>With respect to:</p>
          <MathRenderer mathformula={respectToBoxVal}></MathRenderer>
        <MathRenderer mathformula={latexanswer}></MathRenderer>
      </div>
    );
}

export default PartialDerivative;
