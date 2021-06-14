import { MouseEventHandler, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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
    const data = {
      calculator: "discriminant",
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
      <h3>Discriminant, Saddle Points, Local Minima and Local Maxima</h3>
      <p>
        The discriminant of the function f can be found using the following
        equation
      </p>
      <MathRenderer mathformula="\frac{d^{2}}{d x^{2}} f \frac{d^{2}}{d y^{2}} f - \left(\frac{d^{2}}{d yd x} f\right)^{2}" />
      <input type="text" value={textboxval} placeholder="Equation" onChange={eqchange} />
      <button onClick={sendMath}>Go</button>
      <MathRenderer
        className="mathrenderer"
        mathformula={latexval}
      ></MathRenderer>
      {latexanswer !== null ? (
        <>
          <h1>Discriminent</h1>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <MathRenderer mathformula={latexanswer.discriminant} />
            </AccordionSummary>

            <AccordionDetails className="detailcenter">
              <ol>
                {latexanswer.steps.discriminant.map((l) => (
                  <>
                    {"text" in l ? (
                      <p>{l.text}</p>
                    ) : (
                      <MathRenderer mathformula={l.latex} />
                    )}
                  </>
                ))}
              </ol>
            </AccordionDetails>
          </Accordion>
          <h1>Saddle Points</h1>
          <ul>
            {latexanswer.steps.saddlepoints.map((l) => (
              <>
                {"text" in l ? (
                  <p>{l.text}</p>
                ) : (
                  <MathRenderer mathformula={l.latex} />
                )}
              </>
            ))}
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
