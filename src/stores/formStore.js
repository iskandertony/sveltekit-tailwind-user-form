import { writable } from 'svelte/store';

export const formData = writable({
    firstName: '',
    lastName: '',
    country: '',
    dateOfBirth: '',
    internalTransfers: false,
    maxTransferAmount: ''
});

export const formErrors = writable({});
