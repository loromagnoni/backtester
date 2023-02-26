export default function fan<T>(...fns: Function[]) {
  return (arg: T) => fns.forEach((fn) => fn(arg));
}
