<script>
    export let label = '';
    export let type = 'text';
    export let id = '';
    export let value = '';
    export let onInput;
    export let error = '';
</script>

<div>
    <label for={id} class="block text-sm font-medium">{label}</label>
    <input
            id={id}
            type={type}
            value={value}
            on:input={onInput}
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
    {#if error}
        <p class="text-sm text-red-600">{error}</p>
    {/if}
</div>

