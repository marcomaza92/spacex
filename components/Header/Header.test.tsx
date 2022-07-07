import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the main title', () => {
  render(<Header />);
  const element = screen.getByTestId('title');
  expect(element).toBeInTheDocument();
});
