import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from './Content';

test('renders empty state', () => {
  render(<Content />);
  const element = screen.getByTestId('total-launches');
  expect(element).toBeInTheDocument();
});
