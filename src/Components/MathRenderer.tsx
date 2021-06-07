// App.js
import React from "react";
import { parse } from "mathjs";
import { Node } from "@nteract/mathjax";

const MathRenderer = (props: any) => {
  return (
    <div>
      <p>
        <Node>{props.mathformula}</Node>
      </p>
    </div>
  );
};

export default MathRenderer;
