import { StateSetter } from '../interfaces/setter';

interface ChangeReplayDateDependencies {
  stateSetter: StateSetter;
  newReplayDate: Date;
  resetChart: CallableFunction;
}

export default function changeReplayDate({
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
