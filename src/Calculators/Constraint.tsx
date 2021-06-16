import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { parse } from "mathjs";
import { Link } from "react-router-dom";

function Constraint() {
  const [textboxval, setTextBoxVal] = useState("");
  const [latexval, setLatexVal] = useState("");
  const [latexanswer, setLatexAnswer] = useState("");
  const [constraintVal, setConstraintBoxVal] = useState("");

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
    setConstraintBoxVal(e.target.value);
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
      calculator: "constraint",
      data: { mathequation: textboxval, constraint: constraintVal },
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
      <h3>Min and Max Subject to Constraint</h3>
      <p>
        Provide two equations, one that will be used to find the extrema for,
        and one that constraints the first equation. This calculator accepts all
        three variables 'x' 'y' and 'z' although you can choose to just use 'x'
        and 'y'.
      </p>
      <input
        type="text"
        value={textboxval}
        placeholder="Equation"
        onChange={eqchange}
      />
      <input
        type="text"
        value={constraintVal}
        placeholder="Constraint"
        onChange={varchange}
      />
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      <p>Subject to constraint: </p>
      <MathRenderer mathformula={constraintVal}></MathRenderer>
      <MathRenderer mathformula={latexanswer}></MathRenderer>
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default Constraint;
