import { MouseEventHandler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import App from "./App";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";

function Derivative() {
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
      blockinline = parse(`Not a valid input`).toTex();
    }
    setLatexVal(blockinline);
  };

  const sendMath = () => {
    const data = {
      calculator: "derivative",
      data: { mathequation: textboxval },
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
        <h3>Derivative</h3>
        <input type="text" value={textboxval} placeholder="Equation" onChange={eqchange} />
        <button onClick={sendMath}>Go</button>
        <MathRenderer mathformula={latexval}></MathRenderer>
        <MathRenderer mathformula={latexanswer}></MathRenderer>
      </div>
    );
}

export default Derivative