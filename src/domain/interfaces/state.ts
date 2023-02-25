import Asset from './asset';
import Timeframe from './timeframe';
import Velocity from './velocity';

export default interface State {
  assetSelected: Asset | undefined;
  timeframeSelected: Timeframe | undefined;
  replayDate: Date | undefined;
  isReplaying: boolean | undefined;
  replayVelocity: Velocity | undefined;
}
