import { truncateDecimals } from 'core/converter';

export enum TradeType {
    LONG = 'long',
    SHORT = 'short',
}

export enum OrderType {
    TP = 'TP',
    SL = 'SL',
    SELL_LIMIT = 'SELL_LIMIT',
    BUY_LIMIT = 'BUY_LIMIT',
    SELL_STOP = 'SELL_STOP',
    BUY_STOP = 'BUY_STOP',
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

export type Order = {
    id: string;
    creationTimestamp: number;
    price: number;
    type: OrderType;
    takeProfitPrice?: number;
    stopLossPrice?: number;
};

let incremental = 0;

export const generateTradeId = (): string => {
    return (++incremental).toString();
};

export const getOrderType = (
    currentPrice: number,
    orderPrice: number,
    stopLossPrice: number
): OrderType => {
    return orderPrice > currentPrice
        ? stopLossPrice > orderPrice
            ? OrderType.SELL_LIMIT
            : OrderType.BUY_STOP
        : stopLossPrice > orderPrice
        ? OrderType.SELL_STOP
        : OrderType.BUY_LIMIT;
};

export const calculateProfit = (trade: Trade, currentPrice: number): number => {
    return truncateDecimals(
        (trade.entryPrice - currentPrice) *
            (trade.type === TradeType.SHORT ? 1 : -1) *
            100000,
        2
    );
};

export const hasToBeClosed = (t: Trade, currentPrice: number): boolean =>
    (t.type === TradeType.LONG &&
        ((!!t.takeProfitPrice && t.takeProfitPrice <= currentPrice) ||
            (!!t.stopLossPrice && t.stopLossPrice >= currentPrice))) ||
    (t.type === TradeType.SHORT &&
        ((!!t.takeProfitPrice && t.takeProfitPrice >= currentPrice) ||
            (!!t.stopLossPrice && t.stopLossPrice <= currentPrice)));
