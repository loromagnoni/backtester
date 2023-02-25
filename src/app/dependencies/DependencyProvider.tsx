import assetRepository from 'dependencies/assetRepository/assetRepository';
import timeframeRepository from 'dependencies/timeframeRepository/timeframeRepository';
import velocityRepository from 'dependencies/velocityRepository/velocityRepository';
import { createContext, ReactElement } from 'react';

const dependencies = {
  assetRepository: assetRepository(),
  timeframeRepository: timeframeRepository(),
  velocityRepository: velocityRepository(),
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
