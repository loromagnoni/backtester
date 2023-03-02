import assetRepository from 'dependencies/repositories/assetRepository/assetRepository';
import chartManager from 'dependencies/managers/chartManager/chartManager';
import replayManager from 'dependencies/managers/replayManager';
import useZustandStore from 'dependencies/state/zustandState';
import timeframeRepository from 'dependencies/repositories/timeframeRepository/timeframeRepository';
import velocityRepository from 'dependencies/repositories/velocityRepository/velocityRepository';
import { StateSetter } from 'domain/dependencies/state/setter';
import State from 'domain/dependencies/state/state';
import { createContext, ReactElement, useMemo } from 'react';
import messageManager from 'dependencies/managers/messageManager';
import Dependencies from 'domain/dependencies';

const defaultStateSetter: StateSetter = () => {};

const defaultDeps = {
  assetRepository: assetRepository(),
  timeframeRepository: timeframeRepository(),
  velocityRepository: velocityRepository(),
  chartManager: chartManager(),
  replayManager: replayManager(),
  messageManager: messageManager(),
  state: {} as State,
  stateSetter: defaultStateSetter,
};

export const DependenciesContext = createContext(defaultDeps);

interface DependencyProviderProps {
  children: ReactElement;
  dependencies: Partial<Dependencies>;
}

export default function DependencyProvider({
  children,
  dependencies,
}: DependencyProviderProps) {
  const store = useZustandStore();
  const depsInContext = useMemo(
    () => ({
      ...defaultDeps,
      state: store.values,
      stateSetter: store.setter,
      ...dependencies,
    }),
    [dependencies, store.setter, store.values]
  );
  return (
    <DependenciesContext.Provider value={depsInContext}>
      {children}
    </DependenciesContext.Provider>
  );
}
