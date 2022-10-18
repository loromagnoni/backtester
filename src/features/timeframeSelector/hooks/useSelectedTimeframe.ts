import { generateSharedStateHook } from '../../../core/generateSharedStateHook';
import { DEFAULT_TIMEFRAME, Timeframe } from '../data/timeframes';

export const useSelectedTimeframe =
    generateSharedStateHook<Timeframe>(DEFAULT_TIMEFRAME);
