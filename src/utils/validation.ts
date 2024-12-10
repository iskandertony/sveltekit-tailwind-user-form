interface FormData {
    firstName: string;
    lastName: string;
    country: string;
    dateOfBirth: string;
    internalTransfers: boolean;
    maxTransferAmount?: string;
}

interface ValidationErrors {
    [key: string]: string;
}

export function validateForm(data: FormData): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!data.firstName) errors.firstName = 'First Name is required';
    if (!data.lastName) errors.lastName = 'Last Name is required';
    if (!data.country) errors.country = 'Country is required';
    if (!data.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
    if (data.internalTransfers && !data.maxTransferAmount) {
        errors.maxTransferAmount = 'Max Transfer Amount is required';
    }

    return errors;
}
