import State from 'domain/interfaces/state';
import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setState } from './globalSlice';
import { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useGlobalState = () => {
  const globalState = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const globalSetter = useCallback(
    (newValue: Partial<State>) => dispatch(setState(newValue)),
    []
  );
  return [globalState, globalSetter] as const;
};
