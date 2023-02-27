import { StateSetter } from 'domain/dependencies/state/setter';
import State from 'domain/dependencies/state/state';
import Asset from 'domain/models/asset';
import CandleStick from 'domain/models/candlestick';
import Timeframe from 'domain/models/timeframe';
import Velocity from 'domain/models/velocity';
import { create } from 'zustand';

const useStore = create<State & { setter: StateSetter }>((set) => ({
  assetSelected: undefined as Asset | undefined,
  timeframeSelected: undefined as Timeframe | undefined,
  replayTimestamp: undefined as number | undefined,
  startingReplayTimestamp: undefined as number | undefined,
  isReplaying: undefined as boolean | undefined,
  replayVelocity: undefined as Velocity | undefined,
  lastCandle: undefined as CandleStick | undefined,
  cumulativeTicks: undefined as number | undefined,
  setter: set,
}));

export default function useZustandStore() {
  const store = useStore();
  return { values: store, setter: store.setter };
}
