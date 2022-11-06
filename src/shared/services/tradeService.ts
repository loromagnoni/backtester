import { truncateDecimals } from 'core/converter';
import {
    CustomPriceLineDraggedEventParams,
    SeriesMarkerPosition,
    SeriesMarkerShape,
} from 'core/lightweight-chart/lightweight-charts.js';
import { addPriceLine } from 'features/chart';

export enum TradeType {
    LONG = 'long',
    SHORT = 'short',
}

export enum OrderType {
    TP = 'TP',
    SL = 'SL',
}

export type Trade = {
    id: string;
    entryTimestamp: number;
    entryPrice: number;
    takeProfitPrice?: number;
    stopLossPrice?: number;
    closePrice: number | undefined;
    profit: number | undefined;
    type: TradeType;
};

let incremental = 0;

export const generateTradeId = (): string => {
    return (++incremental).toString();
};

export const calculateProfit = (trade: Trade, currentPrice: number): number => {
    return truncateDecimals(
        (trade.entryPrice - currentPrice) *
            (trade.type === TradeType.SHORT ? 1 : -1) *
            100000,
        2
    );
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

export const drawTakeProfitLine = (t: Trade) => {
    if (t.takeProfitPrice) {
        addPriceLine(t.takeProfitPrice, '#4bffb5', t.id, OrderType.TP);
    }
};
export const drawStopLossLine = (t: Trade) => {
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

export const hasToBeClosed = (t: Trade, currentPrice: number): boolean =>
    (t.type === TradeType.LONG &&
        ((!!t.takeProfitPrice && t.takeProfitPrice <= currentPrice) ||
            (!!t.stopLossPrice && t.stopLossPrice >= currentPrice))) ||
    (t.type === TradeType.SHORT &&
        ((!!t.takeProfitPrice && t.takeProfitPrice >= currentPrice) ||
            (!!t.stopLossPrice && t.stopLossPrice <= currentPrice)));
