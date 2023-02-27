import { StateSetter } from 'domain/dependencies/state/setter';

interface ChangeReplayDateDependencies {
  stateSetter: StateSetter;
  newReplayDate: Date;
  resetChart: CallableFunction;
}

export default function changeStartReplayDate({
  stateSetter,
  newReplayDate,
  resetChart,
}: ChangeReplayDateDependencies) {
  const newTimestamp = newReplayDate.getTime();
  stateSetter({
    startingReplayTimestamp: newTimestamp,
    replayTimestamp: newTimestamp,
  });
  resetChart();
}
