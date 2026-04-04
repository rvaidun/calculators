export interface DiscriminantStep {
  text?: string;
  latex?: string;
}

export interface DiscriminantResponse {
  discriminant: string;
  saddlepoints: string[];
  min: string[];
  max: string[];
  steps: {
    discriminant: DiscriminantStep[];
    saddlepoints: DiscriminantStep[];
  };
}

export interface TangentPlaneResponse {
  answer: string;
}

export interface CalculatorRequest {
  calculator: string;
  data: Record<string, unknown>;
}
