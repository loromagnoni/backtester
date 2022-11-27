import {
    CandlestickData,
    CustomPriceLineDraggedEventParams,
    IChartApi,
    IPriceLine,
    ISeriesApi,
    LineData,
    LineStyle,
    MouseEventHandler,
    SeriesMarkerPosition,
    SeriesMarkerShape,
    WhitespaceData,
} from 'core/lightweight-chart';
import { Order, OrderType, Trade } from './tradeService';

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

type PriceLineOptions = {
    price: number;
    color: string;
    lineStyle: LineStyle;
    title: string;
};

export const addPriceLine = ({
    price,
    color,
    lineStyle,
    title,
}: PriceLineOptions) => {
    const priceLine = serie?.createPriceLine({
        price,
        color,
        lineWidth: 1,
        lineVisible: true,
        lineStyle: lineStyle,
        axisLabelVisible: true,
        draggable: true,
        title: title,
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
        addPriceLine({
            price: t.takeProfitPrice,
            color: '#4bffb5',
            lineStyle: LineStyle.Solid,
            title: getPriceLineTitle(t.id, OrderType.TP),
        });
    }
};

export const drawOrderTakeProfitLine = (
    t: Pick<Order, 'id' | 'takeProfitPrice'>
) => {
    if (t.takeProfitPrice) {
        addPriceLine({
            price: t.takeProfitPrice,
            color: '#4bffb5',
            lineStyle: LineStyle.Dotted,
            title: getPriceLineTitle(t.id, OrderType.TP),
        });
    }
};
export const drawOrderStopLossLine = (
    t: Pick<Order, 'id' | 'stopLossPrice'>
) => {
    if (t.stopLossPrice) {
        addPriceLine({
            price: t.stopLossPrice,
            color: '#ff4b4b',
            lineStyle: LineStyle.Dotted,
            title: getPriceLineTitle(t.id, OrderType.SL),
        });
    }
};

export const drawStopLossLine = (t: Pick<Trade, 'id' | 'stopLossPrice'>) => {
    if (t.stopLossPrice) {
        addPriceLine({
            price: t.stopLossPrice,
            color: '#ff4b4b',
            lineStyle: LineStyle.Solid,
            title: getPriceLineTitle(t.id, OrderType.SL),
        });
    }
};

export const drawPriceLine = (o: Pick<Order, 'id' | 'price' | 'type'>) => {
    addPriceLine({
        price: o.price,
        color: '#696969',
        lineStyle: LineStyle.Dotted,
        title: getPriceLineTitle(o.id, o.type),
    });
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
    openPositions: Pick<Trade, 'id' | 'takeProfitPrice' | 'stopLossPrice'>[],
    limitOrders: Pick<
        Order,
        'id' | 'takeProfitPrice' | 'stopLossPrice' | 'price' | 'type'
    >[]
) => {
    clearPriceLines();
    openPositions.forEach(drawTakeProfitLine);
    openPositions.forEach(drawStopLossLine);
    limitOrders.forEach(drawPriceLine);
    limitOrders.forEach(drawOrderTakeProfitLine);
    limitOrders.forEach(drawOrderStopLossLine);
};

const clickSubscribers: MouseEventHandler[] = [];

export const chartSubscribeClick = (callback: MouseEventHandler) => {
    clickSubscribers.push(callback);
    chart?.subscribeClick(callback);
};

export const chartUnsubscribeAllClick = () => {
    clickSubscribers.forEach((c) => chart?.unsubscribeClick(c));
    clickSubscribers.length = 0;
};

export const getPriceAtY = (y: number) => {
    return serie?.coordinateToPrice(y);
};
