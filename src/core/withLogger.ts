export const withLogger = <T extends (...args: any[]) => any>(fn: T): T => {
    return ((...args: any[]) => {
        console.log(`Calling ${fn.name} with args: ${args}`);
        return fn(...args);
    }) as T;
}