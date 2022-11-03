import { truncateDecimals } from 'core/converter';
import {
    SeriesMarkerPosition,
    SeriesMarkerShape,
} from 'core/lightweight-chart/lightweight-charts.js';
import { v4 as uuidv4 } from 'uuid';

export enum TradeType {
    LONG = 'long',
    SHORT = 'short',
}

export type Trade = {
    id: string;
    entryTimestamp: number;
    entryPrice: number;
    takeProfitPrice?: number;
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
        text: `Buy ${size} @ ${price}`,
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
        text: `Sell ${size} @ ${price}`,
    };
};
