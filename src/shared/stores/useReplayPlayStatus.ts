import { generateSharedStateHook } from '../../core/generateSharedStateHook';

export const useReplayPlayStatus = generateSharedStateHook<boolean>(false);
