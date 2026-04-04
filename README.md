# vcalcs — Vector Calculus Calculators

A web application providing symbolic math calculators for common vector calculus problems. Built with React/TypeScript on the frontend and Python/Flask + SymPy on the backend.

## Calculators

| Calculator | Description |
|---|---|
| Derivative | Derivative of f(x) with respect to x |
| Partial Derivative | Partial derivative of f with respect to any variable |
| Discriminant | Discriminant, saddle points, local minima/maxima of f(x, y) |
| Tangent Plane | Equation of tangent plane to f(x, y) at a given point |
| Taylor Polynomial | Multivariable Taylor polynomial of any order |
| Min/Max with Constraint | Lagrange multiplier extrema for f subject to g |
| Divergence and Curl | Divergence and curl of a 3D vector field |

## Tech Stack

- **Frontend**: React 17, TypeScript, Material-UI, MathJax (`@nteract/mathjax`), mathjs
- **Backend**: Python, Flask, SymPy
- **Math rendering**: MathJax via `@nteract/mathjax`

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The Flask server runs on `http://localhost:5000` by default.

To enable debug mode:
```bash
FLASK_DEBUG=true python app.py
```

### Frontend

```bash
# Install dependencies
yarn install

# Start development server (proxies API calls to Flask on port 5000)
yarn start
```

Open `http://localhost:3000` in your browser.

### Building for Production

```bash
yarn build
```

This outputs to `backend/build/`, which Flask serves as static files. Run `python backend/app.py` to serve the full application.

## Running Tests

### Backend tests

```bash
cd backend
pytest test_calculators.py -v
```

### Frontend tests

```bash
yarn test
```

## Project Structure

```
├── src/
│   ├── App.tsx                  # Router and page components
│   ├── Navbar.tsx               # Navigation bar
│   ├── types.ts                 # TypeScript interfaces
│   ├── hooks/
│   │   ├── useCalculator.ts     # Shared fetch + error handling hook
│   │   └── useLatexPreview.ts   # Live LaTeX preview hook
│   ├── Calculators/             # One component per calculator
│   └── Components/
│       └── MathRenderer.tsx     # MathJax wrapper
├── backend/
│   ├── app.py                   # Flask server and routes
│   ├── calculatorsfuncs.py      # SymPy calculator implementations
│   ├── requirements.txt         # Python dependencies
│   └── test_calculators.py      # Backend unit tests
└── public/
```

## Input Syntax

Equations use Python/SymPy syntax:

- Exponentiation: `x**2` or `x^2`
- Euler's number: `e` (automatically converted to `E`)
- Implicit multiplication: `2x` is valid
- Trig functions: `sin(x)`, `cos(x)`, `tan(x)`
- Natural log: `log(x)`
