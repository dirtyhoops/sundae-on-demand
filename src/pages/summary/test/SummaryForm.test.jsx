import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('initial conditions for checkbox and button', () => {
  render(<SummaryForm />);

  // check that the button starts out disabled
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' });
  expect(confirmButton).toBeDisabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions'
  });
  expect(checkbox).not.toBeChecked();
});

test('checkbox enables button on first click and disable on second click', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions'
  });
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' });

  // enable confirmButton on first click
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // disable confirmButton on second click
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
