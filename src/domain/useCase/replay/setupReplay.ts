import ReplayManager from 'domain/dependencies/managers/replayManager';

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
