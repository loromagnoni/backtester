import { useContext } from 'react';
import { DependenciesContext } from './DependencyProvider';

export default function useDependencies() {
  return useContext(DependenciesContext);
}
