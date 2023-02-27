import ReplayManager from 'domain/dependencies/managers/replayManager';

export default function replayManager(): ReplayManager {
  let interval: NodeJS.Timeout | null;
  let callback: CallableFunction | undefined;
  return {
    setCallback(fn: CallableFunction) {
      callback = fn;
    },
    changeVelocity(updadesPerSecond: number) {
      if (interval) {
        this.endTimer();
        this.startTimer(updadesPerSecond);
      }
    },
    startTimer(updatesPerSecond: number) {
      interval = setInterval(() => {
        if (callback) {
          callback();
        } else {
          throw new Error('Replay callback not set!');
        }
      }, 1000 / updatesPerSecond);
    },
    endTimer() {
      if (interval) clearInterval(interval);
      interval = null;
    },
  };
}
