import CandleStick from 'domain/models/candlestick';

export default function serieCache() {
  const cache: Map<string, CandleStick[]> = new Map();

  return {
    saveSerie(serie: CandleStick[], key: string) {
      cache.set(key, serie);
    },
    getSerie(key: string): CandleStick[] | undefined {
      return cache.get(key);
    },
  };
}
