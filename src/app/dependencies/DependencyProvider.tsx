import assetRepository from 'dependencies/assetRepository/assetRepository';
import chartManager from 'dependencies/chartManager/chartManager';
import replayManager from 'dependencies/replayManager/replayManager';
import useZustandStore from 'dependencies/state/zustandState';
import timeframeRepository from 'dependencies/timeframeRepository/timeframeRepository';
import velocityRepository from 'dependencies/velocityRepository/velocityRepository';
import { StateSetter } from 'domain/dependencies/state/setter';
import State from 'domain/dependencies/state/state';
import { createContext, ReactElement, useMemo } from 'react';

const defaultStateSetter: StateSetter = () => {};

const defaultDeps = {
  assetRepository: assetRepository(),
  timeframeRepository: timeframeRepository(),
  velocityRepository: velocityRepository(),
  chartManager: chartManager(),
  replayManager: replayManager(),
  state: {} as State,
  stateSetter: defaultStateSetter,
};

export const DependenciesContext = createContext(defaultDeps);

export default function DependencyProvider({
  children,
}: {
  children: ReactElement;
}) {
  const store = useZustandStore();
  const dependencies = useMemo(
    () => ({ ...defaultDeps, state: store.values, stateSetter: store.setter }),
    [store.setter, store.values]
  );
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}
