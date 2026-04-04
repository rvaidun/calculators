import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page heading', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to vcalcs!/i)).toBeInTheDocument();
});

test('renders calculator links on home page', () => {
  render(<App />);
  expect(screen.getByText('Derivative')).toBeInTheDocument();
  expect(screen.getByText('Partial Derivative')).toBeInTheDocument();
  expect(screen.getByText('Discriminant')).toBeInTheDocument();
  expect(screen.getByText('Tangent Plane')).toBeInTheDocument();
  expect(screen.getByText('Taylor Polynomial')).toBeInTheDocument();
  expect(screen.getByText('Min and Max Subject to Constraint')).toBeInTheDocument();
  expect(screen.getByText('Divergence and Curl')).toBeInTheDocument();
});

test('renders navigation bar', () => {
  render(<App />);
  expect(screen.getByText('Vcalcs')).toBeInTheDocument();
});
