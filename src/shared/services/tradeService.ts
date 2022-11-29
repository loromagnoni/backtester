import { truncateDecimals } from 'core/converter';

export enum OrderDirection {
    LONG,
    SHORT,
}

export enum OrderType {
    TAKE_PROFIT,
    STOP_LOSS,
    MARKET_LONG,
    MARLET_SHORT,
    SELL_LIMIT,
    BUY_LIMIT,
    SELL_STOP,
    BUY_STOP,
}

export type Order = {
    id: string;
    creationTimestamp: number;
    triggeredTimestamp?: number;
    isTriggered: boolean;
    price: number;
    type: OrderType;
    takeProfitPrice?: number;
    stopLossPrice?: number;
    closePrice?: number;
    profit?: number;
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

export const isTriggered = (o: Pick<Order, 'isTriggered'>) => o.isTriggered;
export const isPendingOrder = (o: Pick<Order, 'isTriggered'>) => !o.isTriggered;

export const getOrderDirection = (o: Pick<Order, 'type'>): OrderDirection =>
    [OrderType.BUY_LIMIT, OrderType.BUY_STOP, OrderType.MARKET_LONG].includes(
        o.type
    )
        ? OrderDirection.LONG
        : OrderDirection.SHORT;

export const calculateProfit = (order: Order, currentPrice: number): number => {
    return truncateDecimals(
        (order.price - currentPrice) *
            (getOrderDirection(order) === OrderDirection.SHORT ? 1 : -1) *
            100000,
        2
    );
};

export const hasToBeClosed = (o: Order, currentPrice: number): boolean =>
    (getOrderDirection(o) === OrderDirection.LONG &&
        ((!!o.takeProfitPrice && o.takeProfitPrice <= currentPrice) ||
            (!!o.stopLossPrice && o.stopLossPrice >= currentPrice))) ||
    (getOrderDirection(o) === OrderDirection.SHORT &&
        ((!!o.takeProfitPrice && o.takeProfitPrice >= currentPrice) ||
            (!!o.stopLossPrice && o.stopLossPrice <= currentPrice)));

export const hasToBeTriggered = (o: Order, currentPrice: number): boolean =>
    ([OrderType.SELL_STOP, OrderType.BUY_LIMIT].includes(o.type) &&
        o.price >= currentPrice) ||
    ([OrderType.SELL_LIMIT, OrderType.BUY_STOP].includes(o.type) &&
        o.price <= currentPrice);
