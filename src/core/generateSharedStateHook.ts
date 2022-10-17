import { Dispatch, SetStateAction, useEffect, useState } from "react";

type StateSetter<T> = (arg: T) => T;

const isStateSetter = <T>(arg: T | StateSetter<T>): arg is StateSetter<T> => {
    return typeof arg === 'function';
};


export const generateSharedStateHook = <T>(initialValue:T) : () => readonly [T, Dispatch<SetStateAction<T>>] => {
    const store = { state: initialValue, listeners: [] as Dispatch<SetStateAction<T>>[] };
  
    const setSharedState: Dispatch<SetStateAction<T>> = (newValueOrSetterFunction) => {
      let newValue = newValueOrSetterFunction;
      if (isStateSetter(newValueOrSetterFunction)) {
        newValue = newValueOrSetterFunction(store.state);
      }
      if (newValue !== store.state) {
        store.state = newValue as T;
        store.listeners.forEach(listener => listener(store.state));
      }
    }
    
    const useHook = () => {
        const newListener = useState<T>(initialValue)[1];
        useEffect(() => {
           store.listeners.push(newListener);
           return () => {
             store.listeners = store.listeners.filter(listener => listener !== newListener);
           };
         }, []);
       return [store.state, setSharedState] as const;
    }

    return useHook;
    
  };