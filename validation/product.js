const validateProduct = data => {
  let validation = [];
  let errors = {};
  let isValid = true;
  if (!data.productName) {
    errors.productName = "Name of the product must not be empty";
    isValid = false;
    validation.push(errors);
  } 
  if (data.productQuantity < 1 || !data.productQuantity) {
    errors.productQuantity = "Quantity must be at least 1";
    isValid = false;
    validation.push(errors);
  }
  if (data.productSmallPrice < 0 || !data.productSmallPrice) {
    errors.productSmallPrice = "Small Price must be greater than 0";
    isValid = false;
    validation.push(errors);
  }
  if (data.productBigPrice < 0 || !data.productBigPrice) {
    errors.productBigPrice = "Big Price must be greater than 0";
    isValid = false;
    validation.push(errors);
  }
  validation.push(isValid);
  return validation;
};

module.exports = { validateProduct };
