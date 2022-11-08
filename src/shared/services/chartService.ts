import {
    CandlestickData,
    CustomPriceLineDraggedEventParams,
    IChartApi,
    IPriceLine,
    ISeriesApi,
    LineData,
    LineStyle,
    SeriesMarkerPosition,
    SeriesMarkerShape,
    WhitespaceData,
} from 'core/lightweight-chart';
import { OrderType, Trade } from './tradeService';

export let serie: ISeriesApi<'Candlestick'> | undefined;
export let chart: IChartApi | undefined;
export const lines = [] as ISeriesApi<'Line'>[];
const priceLines = [] as IPriceLine[];

export const setChart = (c: IChartApi) => (chart = c);
export const setSerie = (s: ISeriesApi<'Candlestick'>) => (serie = s);

export const setChartSerie = (data: (CandlestickData | WhitespaceData)[]) => {
    serie?.setData(data);
};

export const updateChartSerie = (data: CandlestickData | WhitespaceData) =>
    serie?.update(data);

export const clearPriceLines = () => {
    priceLines.forEach((l) => serie?.removePriceLine(l));
    priceLines.length = 0;
};

export const clearLines = () => {
    lines.forEach((l) => chart?.removeSeries(l));
    lines.length = 0;
};

export const updateMarkers = (m: Marker[]) => serie?.setMarkers(m);

export const addPositionLine = (data: LineData[], color: string) => {
    const lineSerie = chart!.addLineSeries({
        color,
        lineWidth: 1,
        lineStyle: 2,
        priceLineVisible: false,
        lastValueVisible: false,
    });
    lineSerie.setData(data);
    lines.push(lineSerie);
};

export const addPriceLine = (
    price: number,
    color: string,
    tradeId: string,
    orderType: OrderType
) => {
    const priceLine = serie?.createPriceLine({
        price,
        color,
        lineWidth: 1,
        lineVisible: true,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        draggable: true,
        title: getPriceLineTitle(tradeId, orderType),
    });
    priceLines.push(priceLine!);
};

export type Marker = {
    tradeId: string;
    time: any;
    position: SeriesMarkerPosition;
    color: string;
    shape: SeriesMarkerShape;
    text: string;
};

export const getBuyMarker = (
    tradeId: string,
    time: any,
    size: number,
    price: number
): Marker => {
    return {
        tradeId,
        time: time,
        position: 'belowBar',
        color: '#FFFFFF',
        shape: 'circle',
        text: `#${tradeId} Buy ${size} @ ${price}`,
    };
};

export const getSellMarker = (
    tradeId: string,
    time: any,
    size: number,
    price: number
): Marker => {
    return {
        tradeId,
        time: time,
        position: 'aboveBar',
        color: '#FFFFFF',
        shape: 'circle',
        text: `#${tradeId} Sell ${size} @ ${price}`,
    };
};

export const drawTakeProfitLine = (
    t: Pick<Trade, 'id' | 'takeProfitPrice'>
) => {
    if (t.takeProfitPrice) {
        addPriceLine(t.takeProfitPrice, '#4bffb5', t.id, OrderType.TP);
    }
};
export const drawStopLossLine = (t: Pick<Trade, 'id' | 'stopLossPrice'>) => {
    if (t.stopLossPrice) {
        addPriceLine(t.stopLossPrice, '#ff4b4b', t.id, OrderType.SL);
    }
};

export const getPriceLineTitle = (
    tradeId: string,
    orderType?: OrderType
): string => {
    const orderTypeString = orderType ?? '';
    return `#${tradeId} ${orderTypeString}`;
};

export const getTradeIdFromPriceLine = (
    p: CustomPriceLineDraggedEventParams
): string =>
    p.customPriceLine.options().title?.split(' ')[0].replace('#', '') ?? '';

export const getPriceFromPriceLine = (
    p: CustomPriceLineDraggedEventParams
): number => p.customPriceLine.options().price;

export const getOrderTypeFromPriceLine = (
    p: CustomPriceLineDraggedEventParams
): OrderType | undefined => {
    const title = p.customPriceLine.options().title;
    const orderType = title.split(' ')[1];
    if (orderType) return orderType as OrderType;
    return undefined;
};

export const updatePriceLines = (
    openPositions: Pick<Trade, 'id' | 'takeProfitPrice' | 'stopLossPrice'>[]
) => {
    clearPriceLines();
    openPositions.forEach(drawTakeProfitLine);
    openPositions.forEach(drawStopLossLine);
};
