import Timeframe from './timeframe';

export default interface TimeframeRepository {
  getAvailableTimeframes: () => Timeframe[];
  getTimeframeByLabel: (label: string) => Timeframe;
}
