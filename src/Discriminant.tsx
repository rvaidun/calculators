import { MouseEventHandler, useState } from "react";
import "./App.css";
import MathRenderer from "./Components/MathRenderer";
import { parse } from "mathjs";

function Discriminant() {
  const [textboxval, setTextBoxVal] = useState("");
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
    const data = { mathequation: textboxval };
    console.log(data);
    fetch("/discriminant", {
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

  if (latexanswer == "")
    {
      return (
          <div className="standard">
            <h3>Discriminant, Saddle Points, Local Minima and Local Maxima</h3>
            <input type="text" value={textboxval} onChange={eqchange} />
            <button onClick={sendMath}>Go</button>
            <MathRenderer mathformula={latexval}></MathRenderer>
            <h2>Empty Field</h2>
          </div>
      )
    }

  return (
    <div className="standard">
      <h3>Discriminant, Saddle Points, Local Minima and Local Maxima</h3>
      <input type="text" value={textboxval} onChange={eqchange} />
      <button onClick={sendMath}>Go</button>
      <MathRenderer mathformula={latexval}></MathRenderer>
      {latexanswer !== null ? (
        <>
          <h1>Discriminent</h1>
          <MathRenderer mathformula={latexanswer.discriminant} />
          <h1>Saddle Points</h1>
          <ul>
            {latexanswer.saddlepoints.map((number) => (
              <MathRenderer mathformula={number} />
            ))}
          </ul>
          <h1>Local Minima</h1>
          <ul>
            {latexanswer.min.map((number) => (
              <MathRenderer mathformula={number} />
            ))}
          </ul>
          <h1>Local Maximum</h1>
          <ul>
            {latexanswer.max.map((number) => (
              <MathRenderer mathformula={number} />
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Discriminant;
