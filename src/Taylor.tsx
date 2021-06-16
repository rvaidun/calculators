import { useState } from "react";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";
import { Link } from "react-router-dom";

function Taylor() {
  const [textboxval, setTextBoxVal] = useState("");
  const [xval, setxval] = useState("");
  const [yval, setyval] = useState("");
  const [orderval, setorder] = useState("");
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
      calculator: "taylor",
      data: { mathequation: textboxval, point: [xval, yval], order: orderval },
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
      <h3>Taylor Polynomial</h3>
      <p>
        This Taylor Polynomial calculator works for multivariable equations.
        Make sure to use 'x' and 'y'.
      </p>
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
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      {latexanswer !== null ? (
        <>
          <h1>Taylor Polynomial</h1>
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

export default Taylor;
