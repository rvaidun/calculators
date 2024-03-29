import { useState } from "react";
import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { parse } from "mathjs";
import { Link } from "react-router-dom";

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
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      <MathRenderer mathformula={latexanswer}></MathRenderer>
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default Derivative;
