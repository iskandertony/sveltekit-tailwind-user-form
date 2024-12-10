<script>
    import FormField from './FormField.svelte';
    import { validateForm } from '../utils/validation.ts';
    import { formatUSD } from '../utils/format.ts';
    import { writable } from 'svelte/store';

    let formData = {
        firstName: '',
        lastName: '',
        country: '',
        dateOfBirth: '',
        internalTransfers: false,
        maxTransferAmount: ''
    };

    let formErrors = writable({});
    let isFormSubmitted = false;
    let isFormDisabled = false;

    function handleInput(field, event) {
        formData[field] = event.target.value;
    }

    function handleCheckbox(field, event) {
        formData[field] = event.target.checked;
    }

    function handleMaxTransferInput(event) {
        const inputValue = event.target.value;
        formData.maxTransferAmount = formatUSD(inputValue);
    }

    function handleSubmit() {
        const errors = validateForm(formData);
        formErrors.set(errors);

        if (Object.keys(errors).length === 0) {
            console.log('Form Submitted:', formData);
            isFormSubmitted = true;
            isFormDisabled = true;
        }
    }
</script>

<div class="bg-white min-h-screen flex items-center justify-center">
    <div class="w-full max-w-4xl p-6  bg-gray-100 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
            Editing User Details
        </h2>
        <form
                on:submit|preventDefault={handleSubmit}
                class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <FormField
                    label="First Name"
                    id="firstName"
                    value={formData.firstName}
                    onInput={e => handleInput('firstName', e)}
                    error={$formErrors.firstName}
                    disabled={isFormDisabled}
            />

            <FormField
                    label="Last Name"
                    id="lastName"
                    value={formData.lastName}
                    onInput={e => handleInput('lastName', e)}
                    error={$formErrors.lastName}
                    disabled={isFormDisabled}
            />

            <div>
                <label for="country" class="block text-sm font-medium text-gray-700">
                    Country
                </label>
                <select
                        id="country"
                        bind:value={formData.country}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isFormDisabled}
                >
                    <option value="">Select a country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                </select>
                {#if $formErrors.country}
                    <p class="text-sm text-red-600 mt-1">{$formErrors.country}</p>
                {/if}
            </div>

            <div>
                <label
                        for="dateOfBirth"
                        class="block text-sm font-medium text-gray-700"
                >
                    Date of Birth
                </label>
                <input
                        id="dateOfBirth"
                        type="date"
                        bind:value={formData.dateOfBirth}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isFormDisabled}
                />
                {#if $formErrors.dateOfBirth}
                    <p class="text-sm text-red-600 mt-1">{$formErrors.dateOfBirth}</p>
                {/if}
            </div>

            <div class="col-span-full flex items-center">
                <input
                        type="checkbox"
                        bind:checked={formData.internalTransfers}
                        on:change={e => handleCheckbox('internalTransfers', e)}
                        class="form-checkbox h-5 w-5 text-indigo-600"
                        disabled={isFormDisabled}
                />
                <span class="ml-2 text-sm text-gray-700">Internal Transfers</span>
            </div>

            {#if formData.internalTransfers}
                <div class="col-span-full">
                    <label
                            for="maxTransferAmount"
                            class="block text-sm font-medium text-gray-700"
                    >
                        Max Transfer Amount (USD)
                    </label>
                    <input
                            id="maxTransferAmount"
                            type="text"
                            value={formData.maxTransferAmount}
                            on:input={handleMaxTransferInput}
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isFormDisabled}
                    />
                    {#if $formErrors.maxTransferAmount}
                        <p class="text-sm text-red-600 mt-1">
                            {$formErrors.maxTransferAmount}
                        </p>
                    {/if}
                </div>
            {/if}

            <div class="col-span-full">
                <button
                        type="submit"
                        class="w-full py-3 px-6 bg-indigo-600 text-white font-bold text-lg rounded-md shadow-md hover:bg-indigo-700 disabled:bg-gray-400"
                        disabled={isFormDisabled}
                >
                    Save
                </button>
            </div>
        </form>

        {#if isFormSubmitted}
            <div class="mt-6 p-4 bg-green-100 text-green-800 text-center rounded-md">
                Form saved successfully! Check the console for details.
            </div>
        {/if}
    </div>
</div>
