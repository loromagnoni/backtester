import ReplayManager from 'domain/interfaces/replayManager';

export default function replayManager(): ReplayManager {
  let interval: NodeJS.Timeout;
  let callback: CallableFunction | undefined;
  return {
    setCallback(fn: CallableFunction) {
      callback = fn;
    },
    startTimer() {
      interval = setInterval(() => {
        if (callback) {
          callback();
        } else {
          throw new Error('Replay callback not set!');
        }
      }, 300);
    },
    endTimer() {
      clearInterval(interval);
    },
  };
}
