const validateIncreaseItemQuantity = (data, product) => {
  let errors = {};
  let isValid = true;
  let validation = [];

  if (data.quantity > product.quantity - 1) {
    errors.increaseError = "You can not buy more than " + product.quantity;
    isValid = false;
    validation.unshift(isValid, errors);
  }
  return validation;
};

module.exports = { validateIncreaseItemQuantity };
