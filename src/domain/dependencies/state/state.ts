import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';
import Timeframe from 'domain/models/timeframe';
import Velocity from 'domain/models/velocity';

export default interface State {
  assetSelected: Asset | undefined;
  timeframeSelected: Timeframe | undefined;
  startingReplayTimestamp: number | undefined;
  replayTimestamp: number | undefined;
  isReplaying: boolean | undefined;
  replayVelocity: Velocity | undefined;
  lastCandle: CandleStick | undefined;
  cumulativeTicks: number | undefined;
}

type Exact<T, K extends keyof T> = Pick<T, K> &
  Partial<Record<Exclude<keyof T, K>, never>>;

export type StateSlice<K extends keyof State> = Exact<State, K>;
