import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);

  // check that the button starts out disabled
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  expect(checkbox).not.toBeChecked();
});

test('Checkbox enables button on first click and disable on second click', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  // enable confirmButton on first click
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // disable confirmButton on second click
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('Popover responds to hover', async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we moust out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
