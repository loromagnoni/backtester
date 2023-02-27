import TimeframeRepository from 'domain/dependencies/repositories/timeframeRepository';
import timeframes from './timeframes';

export default function timeframeRepository(): TimeframeRepository {
  return {
    getAvailableTimeframes() {
      return timeframes;
    },
    getTimeframeByLabel(label) {
      return (
        timeframes.find((t) => t.label === label) ??
        this.getAvailableTimeframes()[0]
      );
    },
  };
}
