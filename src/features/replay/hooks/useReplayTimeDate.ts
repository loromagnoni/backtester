import { generateSharedStateHook } from '../../../core/generateSharedStateHook';

export const useReplayTimeDate = generateSharedStateHook<Date>(new Date());
export const useDisplayTimeDate = generateSharedStateHook<Date>(new Date());
