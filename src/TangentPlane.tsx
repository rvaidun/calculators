import { MouseEventHandler, useState } from "react";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";

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
      <input type="text" value={textboxval} onChange={eqchange} />
      <input
        type="number"
        value={xval}
        onChange={(e) => setxval(e.target.value)}
      />
      <input
        type="number"
        value={yval}
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
    </div>
  );
}

export default TangentPlane;
