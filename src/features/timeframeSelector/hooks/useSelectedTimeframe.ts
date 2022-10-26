import { generateSharedStateHook } from '../../../core/generateSharedStateHook';
import { Timeframe } from '../data/timeframes';

export const useSelectedTimeframe = generateSharedStateHook<
    Timeframe | undefined
>(undefined);
