import Asset from './asset';
import Timeframe from './timeframe';
import Velocity from './velocity';

export default interface State {
  assetSelected: Asset | undefined;
  timeframeSelected: Timeframe | undefined;
  replayTimestamp: number | undefined;
  isReplaying: boolean | undefined;
  replayVelocity: Velocity | undefined;
}

type Exact<T, K extends keyof T> = Pick<T, K> &
  Partial<Record<Exclude<keyof T, K>, never>>;

export type StateSlice<K extends keyof State> = Exact<State, K>;
