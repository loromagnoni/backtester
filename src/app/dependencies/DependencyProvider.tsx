import assetRepository from 'dependencies/assetRepository/assetRepository';
import chartManager from 'dependencies/chartManager/chartManager';
import replayManager from 'dependencies/replayManager/replayManager';
import timeframeRepository from 'dependencies/timeframeRepository/timeframeRepository';
import velocityRepository from 'dependencies/velocityRepository/velocityRepository';
import { createContext, ReactElement } from 'react';

const dependencies = {
  assetRepository: assetRepository(),
  timeframeRepository: timeframeRepository(),
  velocityRepository: velocityRepository(),
  chartManager: chartManager(),
  replayManager: replayManager(),
};

export const DependenciesContext = createContext(dependencies);

export default function DependencyProvider({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}
