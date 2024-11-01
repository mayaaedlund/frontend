import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Skriv text! header', () => {
  render(<App />);
  const linkElement = screen.getByText(/skriv text!/i);
  expect(linkElement).toBeInTheDocument();
});
