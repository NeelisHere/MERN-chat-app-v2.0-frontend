class FormValidationSchemas {
    username = {
        required: 'This is required',
        minLength: { value: 4, message: 'Minimum length should be 4' },
    }

    password = {
        required: 'This is required',
        minLength: { value: 4, message: 'Minimum length should be 4' },
    }

    email = {
        required: 'This is required',
    }
}   

export default new FormValidationSchemas()