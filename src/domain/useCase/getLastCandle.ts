import CandleStick from 'domain/interfaces/candlestick';
import { StateSlice } from 'domain/interfaces/state';

interface GetLastCandleDependencies {
  state: StateSlice<'lastCandle'>;
}

export default function getLastCandle({
  state,
}: GetLastCandleDependencies): CandleStick {
  if (state.lastCandle) return state.lastCandle;
  return {
    time: 0,
    open: 0,
    close: 0,
    low: 0,
    high: 0,
  };
}
