import ReplayManager from 'domain/dependencies/managers/replayManager';
import toggleReplayActivation from 'domain/useCase/replay/toggleReplayActivation';

test('Should stop timer if replay is paused', () => {
  const startTimer = jest.fn();
  const endTimer = jest.fn();
  const replayManager: ReplayManager = {
    startTimer,
    endTimer,
    setCallback: jest.fn(),
    changeVelocity: jest.fn(),
  };
  toggleReplayActivation({
    isReplaying: true,
    stateSetter: jest.fn(),
    replayManager,
    replayVelocity: { updatesPerSecond: 1 },
  });
  expect(endTimer).toBeCalled();
  expect(startTimer).not.toBeCalled();
});

test('Should stsrt timer if replay is activated', () => {
  const startTimer = jest.fn();
  const endTimer = jest.fn();
  const replayManager: ReplayManager = {
    startTimer,
    endTimer,
    setCallback: jest.fn(),
    changeVelocity: jest.fn(),
  };
  toggleReplayActivation({
    isReplaying: false,
    stateSetter: jest.fn(),
    replayManager,
    replayVelocity: { updatesPerSecond: 1 },
  });
  expect(startTimer).toBeCalled();
  expect(endTimer).not.toBeCalled();
});
