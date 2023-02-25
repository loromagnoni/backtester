import { StateSetter } from '../interfaces/setter';

interface ChangeReplayDateDependencies {
  stateSetter: StateSetter;
  newReplayDate: Date;
}

export default function changeReplayDate({
  stateSetter,
  newReplayDate,
}: ChangeReplayDateDependencies) {
  stateSetter({ replayTimestamp: newReplayDate.getTime() });
}
