export default interface ReplayManager {
  setCallback: (fn: CallableFunction) => void;
  startTimer: (updatesPerSecond: number) => void;
  changeVelocity: (updatesPerSecond: number) => void;
  endTimer: () => void;
}
