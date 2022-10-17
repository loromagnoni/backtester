import { generateSharedStateHook } from "../../../core/generateSharedStateHook";
import { CandleStickSerieData } from "../../chart";

export const useSelectedAssetSerie = generateSharedStateHook<CandleStickSerieData>([]);