import { CandlestickData } from 'lightweight-charts';
import { generateSharedStateHook } from '../../../core/generateSharedStateHook';

export const useSelectedAssetSerie = generateSharedStateHook<CandlestickData[]>(
    []
);
