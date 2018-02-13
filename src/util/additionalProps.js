import PayPalProp, { propTypes } from './paypalProp';

const itemsPayPalProp = new PayPalProp({
  name: 'items',
  paypalName: 'item_list',
  type: Array,
  injection: propTypes.TRANSACTION,
});

itemsPayPalProp.addChangeTransform(items => ({ items }));

const props = [
  // Button Props
  new PayPalProp({ name: 'buttonStyle', paypalName: 'style', injection: propTypes.BUTTON }),
  new PayPalProp({ name: 'braintree', injection: propTypes.BUTTON }),
  new PayPalProp({ name: 'locale', type: String, injection: propTypes.BUTTON }),

  // Payment Props
  new PayPalProp({ name: 'experience', injection: propTypes.PAYMENT }),

  // Transaction Props
  new PayPalProp({
    name: 'invoiceNumber',
    paypalName: 'invoice_number',
    type: String,
    injection: propTypes.TRANSACTION,
  }),
  new PayPalProp({
    name: 'notifyUrl',
    paypalName: 'notify_url',
    type: String,
    injection: propTypes.TRANSACTION,
  }),
  itemsPayPalProp,
];

function vmProps() {
  const vm = {};

  props.forEach((prop) => {
    vm[prop.name] = prop.getVmProp();
  });

  return vm;
}

function getTypedProps(type) {
  return props.filter(prop => prop.injection === type);
}

export default {
  vmProps,
  getTypedProps,
};
