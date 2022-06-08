import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('Update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('Update toppings subtotal when topping change', async () => {
  // render parent component
  render(<Options optionType='toppings' />);

  // make sure total starts at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge'
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('Grand total', () => {
  test('Grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    // check that the grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries toppings and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('Grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    // update hot fudge toppings and check grand total
    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge'
    });
    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    // update chocolate scoops to 2 and check grand total
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate'
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('Grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    // add cherries toppings; grand total should be $.150 after
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });
    userEvent.click(cherriesCheckbox);

    // update vanilla scoops to 2; grand total should be $5.50 after
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    // remove 1 scoop of vanilla; grand total should be $3.50 after
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    // check grand total
    expect(grandTotal).toHaveTextContent('3.50');

    //remove cherries toppings and then check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
