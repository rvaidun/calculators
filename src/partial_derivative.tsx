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

  const eqchange = (e: any) => {
    setTextBoxVal(e.target.value);
    let blockinline: string;
    try {
      blockinline = parse(e.target.value).toTex();
      console.log(blockinline);
    } catch {
      blockinline = parse(`error`).toTex();
    }
    setLatexVal(blockinline);
  };

  const sendMath = () => {
    const data = { mathequation: textboxval };
    console.log(data);
    fetch("/calculator2", {
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
      <div className="PartialDerivative">
        <h3>Partial Derivative</h3>
        <input type="text" value={textboxval} onChange={eqchange} />
        <input maxLength={1} className="smallerTextBox" type="text" />
        <button onClick={sendMath}></button>
        <MathRenderer mathformula={latexval}></MathRenderer>
        <MathRenderer mathformula={latexanswer}></MathRenderer>
      </div>
    );
}

export default PartialDerivative;
