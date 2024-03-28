const decimalPlace = 2;
const depositeRatio = 0.5;
const comRate = 0.15;

// PAYMENT (input is bid)
export function calculateRealAmount(bid: number) {
    return roundPaymentAmount(bid * depositeRatio)
}

export function calculateComAmount(bid: number) {
    return roundPaymentAmount(calculateRealAmount(bid) * comRate)
}

export function calculateTotalAmount(bid: number) {
    return roundPaymentAmount(calculateRealAmount(bid) + calculateComAmount(bid))
}

// PATMENT HISTORY (input is totalAmount)
export function getCommission(totalAmount: number) {
    return roundPaymentAmount(getRealAmount(totalAmount)) * comRate;
}

export function getRealAmount(totalAmount: number) {
    return roundPaymentAmount(totalAmount / (1+comRate));
}

// FORMATTED
export function formatPaymentAmountWithCommas(amount: number): string {
    // Fixing to 2 decimal places
    const fixedAmount = amount.toFixed(decimalPlace);
    const [wholePart, decimalPart] = fixedAmount.split('.');
    const formattedDecimalPart = decimalPart.padEnd(2, '0');
    return `${wholePart}.${formattedDecimalPart}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ROUND FLOAT
export function roundPaymentAmount(amount: number): number {
    // Fixing to 2 decimal places
    return parseFloat(amount.toFixed(decimalPlace));
}