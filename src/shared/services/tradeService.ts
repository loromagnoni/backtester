import { truncateDecimals } from 'core/converter';
import { SeriesMarkerPosition, SeriesMarkerShape } from 'lightweight-charts';
import { v4 as uuidv4 } from 'uuid';

export enum TradeType {
    LONG = 'long',
    SHORT = 'short',
}

export type Trade = {
    id: string;
    entryTimestamp: number;
    entryPrice: number;
    closePrice: number | undefined;
    profit: number | undefined;
    type: TradeType;
};

export const generateTradeId = () => {
    return uuidv4();
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
    time: any;
    position: SeriesMarkerPosition;
    color: string;
    shape: SeriesMarkerShape;
    text: string;
};

export const getBuyMarker = (
    time: any,
    size: number,
    price: number
): Marker => {
    return {
        time: time,
        position: 'belowBar',
        color: '#FFFFFF',
        shape: 'circle',
        text: `Buy ${size} @ ${price}`,
    };
};

export const getSellMarker = (
    time: any,
    size: number,
    price: number
): Marker => {
    return {
        time: time,
        position: 'aboveBar',
        color: '#FFFFFF',
        shape: 'circle',
        text: `Sell ${size} @ ${price}`,
    };
};
