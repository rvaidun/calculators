import { useState } from "react";

interface UseCalculatorReturn<T> {
  result: T | null;
  error: string | null;
  isLoading: boolean;
  calculate: (data: Record<string, unknown>) => Promise<void>;
}

export function useCalculator<T>(calculatorName: string): UseCalculatorReturn<T> {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculate = async (data: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calculator: calculatorName, data }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      if (json && typeof json === "object" && "error" in json) {
        throw new Error(json.error);
      }
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { result, error, isLoading, calculate };
}
