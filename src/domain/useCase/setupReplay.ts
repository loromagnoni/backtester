import ReplayManager from 'domain/interfaces/replayManager';

interface SetupReplayDependencies {
  replayManager: ReplayManager;
  forwardReplay: CallableFunction;
}

export default function setupReplay({
  replayManager,
  forwardReplay,
}: SetupReplayDependencies) {
  replayManager.setCallback(forwardReplay);
}
