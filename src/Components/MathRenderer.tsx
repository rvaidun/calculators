// App.js
import React from "react";
import { parse } from "mathjs";
import { Node } from "@nteract/mathjax";

const MathRenderer = (props: any) => {
  let blockinline: string;
  try {
    blockinline = parse(props.mathformula).toTex();
  } catch {
    blockinline = parse(`error`).toTex();
  }

  return (
    <div>
      <p>
        <Node>{blockinline}</Node>
      </p>
    </div>
  );
};

export default MathRenderer;
