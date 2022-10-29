import { generateSharedStateHook } from '../../core/generateSharedStateHook';

type ReplayCallbackState = {
    callback: Function;
};

export const useReplayCallback = generateSharedStateHook<ReplayCallbackState>({
    callback: () => {},
});
