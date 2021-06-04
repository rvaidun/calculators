// App.js
import React from 'react';

// import react-mathjax
import MathJax from 'react-mathjax';

const MathRenderer = () => {
  const inlineFormula = `k_{n+1} = n^2 + k_n^2 - k_{n-1}`;
  const blockFormula = `\\int_0^\\infty x^2 dx`; 

  return <div style={{padding: 50}}>
    <MathJax.Provider>
      <div>
        <p>Inline formula: <MathJax.Node inline formula={inlineFormula} /></p>
        <hr></hr>
        <p>Block formula:</p>
        <MathJax.Node formula={blockFormula} />
      </div>
    </MathJax.Provider>
  </div>;
};

export default MathRenderer;
