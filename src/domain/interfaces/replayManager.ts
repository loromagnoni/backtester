export default interface ReplayManager {
  setCallback: (fn: CallableFunction) => void;
  startTimer: () => void;
  endTimer: () => void;
}
