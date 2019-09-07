
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name Required'
  }
  if (!values.barcode) {
    errors.barcode = 'Barcode Required'
  }
  if (!values.buyPrice) {
    errors.buyPrice = 'Buy Price Required'
  }
  if (isNaN(values.buyPrice)) {
    errors.buyPrice = 'Invalid Buy Price'
  }
  if (!values.sellPrice) {
    errors.sellPrice = 'Sell Price Required'
  }
  if (isNaN(values.sellPrice)) {
    errors.sellPrice = 'Invalid Sell Price'
  }
  
  return errors;
};

export default validate;