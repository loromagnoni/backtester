export const fan =
    <T>(...fns: Function[]) =>
    (arg: T) =>
        fns.forEach((fn) => fn(arg));
