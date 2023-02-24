import assetRepository from 'dependencies/assetRepository/assetRepository';
import { createContext, ReactElement } from 'react';

const dependencies = {
  assetRepository: assetRepository(),
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
