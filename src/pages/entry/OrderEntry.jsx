import Options from './Options';

export default function OrderEntry() {
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grandtotal</h2>
    </div>
  );
}
