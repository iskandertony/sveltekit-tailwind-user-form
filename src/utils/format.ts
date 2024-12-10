export function formatUSD(value: string): string {
    const number = parseFloat(value.replace(/,/g, '')) || 0;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number).replace('$', '');
}
