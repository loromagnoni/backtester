import ReplayManager from 'domain/interfaces/replayManager';

export default function replayManager(): ReplayManager {
  let interval: NodeJS.Timeout;
  return {
    startTimer() {
      interval = setInterval(() => {
        console.log('ok');
      }, 200);
    },
    endTimer() {
      clearInterval(interval);
    },
  };
}
