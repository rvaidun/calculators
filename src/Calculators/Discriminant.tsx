import { useState } from "react";
import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "../App.css";
import MathRenderer from "../Components/MathRenderer";
import { Link } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";
import { useLatexPreview } from "../hooks/useLatexPreview";
import { DiscriminantResponse, DiscriminantStep } from "../types";

function Discriminant() {
  const [textboxval, setTextBoxVal] = useState("");
  const { latexPreview, updatePreview } = useLatexPreview();
  const { result, error, isLoading, calculate } = useCalculator<DiscriminantResponse>("discriminant");

  const eqchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxVal(e.target.value);
    updatePreview(e.target.value);
  };

  const renderStep = (step: DiscriminantStep, i: number) => (
    <React.Fragment key={i}>
      {"text" in step ? <p>{step.text}</p> : <MathRenderer mathformula={step.latex!} />}
    </React.Fragment>
  );

  return (
    <div className="standard">
      <h3>Discriminant, Saddle Points, Local Minima and Local Maxima</h3>
      <p>
        The discriminant of the function f(x, y) can be found using the following
        equation.
      </p>
      <MathRenderer mathformula="\frac{d^{2}}{d x^{2}} f \frac{d^{2}}{d y^{2}} f - \left(\frac{d^{2}}{d yd x} f\right)^{2}" />
      <p>Your equation must include the variables x and y. </p>
      <input
        type="text"
        value={textboxval}
        placeholder="Equation f(x, y)"
        onChange={eqchange}
      />
      <button onClick={() => calculate({ mathequation: textboxval })} disabled={isLoading}>
        {isLoading ? "Calculating..." : "Go"}
      </button>
      <MathRenderer className="mathrenderer" mathformula={latexPreview} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && (
        <>
          <h1>Discriminant</h1>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <MathRenderer mathformula={result.discriminant} />
            </AccordionSummary>
            <AccordionDetails className="detailcenter">
              <ol>
                {result.steps.discriminant.map(renderStep)}
              </ol>
            </AccordionDetails>
          </Accordion>
          <h1>Saddle Points</h1>
          <ul>
            {result.steps.saddlepoints.map(renderStep)}
            {result.saddlepoints.map((point, i) => (
              <MathRenderer key={i} mathformula={point} />
            ))}
          </ul>
          <h1>Local Minima</h1>
          <ul>
            {result.min.map((point, i) => (
              <MathRenderer key={i} mathformula={point} />
            ))}
          </ul>
          <h1>Local Maximum</h1>
          <ul>
            {result.max.map((point, i) => (
              <MathRenderer key={i} mathformula={point} />
            ))}
          </ul>
        </>
      )}
      <Link to="/">
        <p className="smallerText">Back to Home</p>
      </Link>
    </div>
  );
}

export default Discriminant;
