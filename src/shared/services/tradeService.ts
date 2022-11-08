import { truncateDecimals } from 'core/converter';

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

export const hasToBeClosed = (t: Trade, currentPrice: number): boolean =>
    (t.type === TradeType.LONG &&
        ((!!t.takeProfitPrice && t.takeProfitPrice <= currentPrice) ||
            (!!t.stopLossPrice && t.stopLossPrice >= currentPrice))) ||
    (t.type === TradeType.SHORT &&
        ((!!t.takeProfitPrice && t.takeProfitPrice >= currentPrice) ||
            (!!t.stopLossPrice && t.stopLossPrice <= currentPrice)));
