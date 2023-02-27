import Timeframe from 'domain/models/timeframe';

export default [
  {
    label: 'D',
    minutes: 1440,
  },
  { label: 'H4', minutes: 240 },
  { label: 'H1', minutes: 60 },
  { label: 'M5', minutes: 5 },
  { label: 'M1', minutes: 1 },
] as Timeframe[];
