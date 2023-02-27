import Timeframe from 'domain/models/timeframe';

export default interface TimeframeRepository {
  getAvailableTimeframes: () => Timeframe[];
  getTimeframeByLabel: (label: string) => Timeframe;
}
