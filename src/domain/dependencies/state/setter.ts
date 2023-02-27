import State from './state';

export type StateSetter = (s: Partial<State>) => void;
