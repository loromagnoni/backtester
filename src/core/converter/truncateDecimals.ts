export const truncateDecimals = (value: number, decimals: number): number => {
    return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
