import { fan } from 'core/functional/fan';
import { swap } from 'core/functional/swap';
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
import { isPendingOrder, isTriggered, Order, OrderType } from './tradeService';

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

export const drawTriggeredOrderTakeProfitLine = (
    t: Pick<Order, 'id' | 'takeProfitPrice'>
) => {
    if (t.takeProfitPrice) {
        addPriceLine({
            price: t.takeProfitPrice,
            color: '#4bffb5',
            lineStyle: LineStyle.Solid,
            title: getPriceLineTitle(t.id, OrderType.TAKE_PROFIT),
        });
    }
};

export const drawPendingOrderTakeProfitLine = (
    t: Pick<Order, 'id' | 'takeProfitPrice'>
) => {
    if (t.takeProfitPrice) {
        addPriceLine({
            price: t.takeProfitPrice,
            color: '#4bffb5',
            lineStyle: LineStyle.Dotted,
            title: getPriceLineTitle(t.id, OrderType.TAKE_PROFIT),
        });
    }
};
export const drawPendingOrderStopLossLine = (
    t: Pick<Order, 'id' | 'stopLossPrice'>
) => {
    if (t.stopLossPrice) {
        addPriceLine({
            price: t.stopLossPrice,
            color: '#ff4b4b',
            lineStyle: LineStyle.Dotted,
            title: getPriceLineTitle(t.id, OrderType.STOP_LOSS),
        });
    }
};

export const drawTriggeredOrderStopLossLine = (
    t: Pick<Order, 'id' | 'stopLossPrice'>
) => {
    if (t.stopLossPrice) {
        addPriceLine({
            price: t.stopLossPrice,
            color: '#ff4b4b',
            lineStyle: LineStyle.Solid,
            title: getPriceLineTitle(t.id, OrderType.STOP_LOSS),
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
    orderType: OrderType
): string => {
    return `#${tradeId} ${getStringFromOrderType(orderType)}`;
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
): OrderType => {
    const title = p.customPriceLine.options().title;
    const orderTypeString = title
        .split(' ')
        .slice(1)
        .join(' ') as keyof typeof orderTypeStringMap;
    return getOrderTypeFromString(orderTypeString);
};

const orderTypeStringMap = {
    long: OrderType.MARKET_LONG,
    short: OrderType.MARLET_SHORT,
    'buy limit': OrderType.BUY_LIMIT,
    'buy stop': OrderType.BUY_STOP,
    'sell limit': OrderType.SELL_LIMIT,
    'sell stop': OrderType.SELL_STOP,
    'take profit': OrderType.TAKE_PROFIT,
    'stop loss': OrderType.STOP_LOSS,
};

const getOrderTypeFromString = (
    s: keyof typeof orderTypeStringMap
): OrderType => orderTypeStringMap[s];

export const getStringFromOrderType = (
    t: OrderType
): keyof typeof orderTypeStringMap => swap(orderTypeStringMap)[t];

export const updatePriceLines = (
    openOrders: Pick<
        Order,
        | 'id'
        | 'takeProfitPrice'
        | 'stopLossPrice'
        | 'isTriggered'
        | 'price'
        | 'type'
    >[]
) => {
    clearPriceLines();
    openOrders
        .filter(isTriggered)
        .forEach(
            fan(
                drawTriggeredOrderTakeProfitLine,
                drawTriggeredOrderStopLossLine
            )
        );
    openOrders
        .filter(isPendingOrder)
        .forEach(
            fan(
                drawPendingOrderStopLossLine,
                drawPendingOrderTakeProfitLine,
                drawPriceLine
            )
        );
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
