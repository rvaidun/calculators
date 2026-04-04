import { useState } from "react";
import { parse } from "mathjs";

export function useLatexPreview(initial = "") {
  const [latexPreview, setLatexPreview] = useState(initial);

  const updatePreview = (value: string) => {
    try {
      setLatexPreview(parse(value).toTex());
    } catch {
      setLatexPreview(parse("Not a valid input").toTex());
    }
  };

  return { latexPreview, updatePreview };
}
