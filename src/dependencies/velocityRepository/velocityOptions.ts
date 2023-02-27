import VelocityOption from 'domain/interfaces/velocity';

export default [
  {
    updatesPerSecond: 1, // 1 minute per second
  },
  {
    updatesPerSecond: 5, // 5 minutes per second
  },
  {
    updatesPerSecond: 60, // 1 hour per second
  },
  {
    updatesPerSecond: 240, // 4 hours per second
  },
  {
    updatesPerSecond: 480, // 8 hours per second
  },
] as VelocityOption[];
