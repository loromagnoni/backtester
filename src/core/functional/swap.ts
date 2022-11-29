export const swap = <T extends object>(obj: T): Record<any, keyof T> => {
    const swapped = Object.entries(obj).map(([key, value]) => [value, key]);
    return Object.fromEntries(swapped);
};
