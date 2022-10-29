import { generateSharedStateHook } from '../../core/generateSharedStateHook';

export const useReplayVelocity = generateSharedStateHook<number>(1);
