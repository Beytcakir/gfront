import { ValidationError } from 'yup';

export const response = (ok, message, errors) => ({
    ok,
    message,
    errors
});

export const initialResponse = response(null, '', {});

export const convertFormDataToJSON = (formData) => {
    console.log('FORMDATA:', formData);
    return Object.fromEntries(formData.entries());
};

export const transformYupErrors = (errors) => {
    const errObject = {};
    errors.forEach((error) => (errObject[error.path] = error.message));

    return response(false, '', errObject);
};

export const YupValidationError = ValidationError;

export const isStringArray = (str) => {
    console.log('STR:', str);
    const arr = JSON.parse(str);
    return Array.isArray(arr) && arr.length > 0;
};
