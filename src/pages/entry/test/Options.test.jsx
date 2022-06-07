import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('Displays image for each scoop options from server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const imageTitle = scoopImages.map(element => element.alt);
  expect(imageTitle).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each topping options from server', async () => {
  render(<Options optionType='toppings' />);

  //find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i
  });
  expect(toppingImages).toHaveLength(3);

  const imageTitles = toppingImages.map(element => element.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ]);
});
