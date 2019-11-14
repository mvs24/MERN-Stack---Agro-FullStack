const validateCompany = (data) => {
    let validation = [];
    let errors = {};
    let isValid = true;
    if(data.companyName.length < 2) {
        errors.name = "Name of the company must be greater than 2 words";
        isValid = false;
        validation.push(errors);
    }
    if(data.companyPlace.length < 2) {
        errors.place = 'Name of the place must be greater than 2 words';
        isValid = false;
        validation.push(errors);
    }
    validation.push(isValid);
    return validation;
}

module.exports = {validateCompany};