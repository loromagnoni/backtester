import { StateSetter } from '../interfaces/setter';

interface ChangeReplayDateDependencies {
  stateSetter: StateSetter;
  newReplayDate: Date;
  updateChart: CallableFunction;
}

export default function changeReplayDate({
  stateSetter,
  newReplayDate,
  updateChart,
}: ChangeReplayDateDependencies) {
  stateSetter({ replayTimestamp: newReplayDate.getTime() });
  updateChart();
}
