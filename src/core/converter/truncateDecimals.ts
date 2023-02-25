export default function truncateDecimals(
  value: number,
  decimals: number
): number {
  return Math.ceil(value * 10 ** decimals) / 10 ** decimals;
}
