import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { truncateDecimals } from 'core/converter';
import { CandlestickData } from 'core/lightweight-chart/lightweight-charts.js';
import {
    calculateProfit,
    generateTradeId,
    getOrderType,
    hasToBeClosed,
    hasToBeTriggered,
    isPendingOrder,
    isTriggered,
    Order,
    OrderType,
} from 'shared/services/tradeService';
import { RootState } from './store';

export const totalProfitSelector = (state: RootState) =>
    truncateDecimals(
        state.trade.openOrders.reduce(
            (acc, trade) => acc + (trade.profit ?? 0),
            0
        ),
        2
    );

const closeOrder = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    tradeId: string
) => {
    const toClose = state.openOrders.find((t) => t.id === tradeId)!;
    state.closedOrders.push(toClose);
    state.openOrders = state.openOrders.filter((t) => t.id !== tradeId);
};

const openOrder = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    tradeId: string
) => {
    state.openOrders.forEach((o) => {
        if (o.id === tradeId) {
            o.isTriggered = true;
            o.triggeredTimestamp = new Date(
                state.currentCandle!.time as string
            ).getTime();
        }
    });
};

const maybeClosePosition = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    currentPrice: number
) => {
    state.openOrders
        .filter(isTriggered)
        .filter((t) => hasToBeClosed(t, currentPrice))
        .forEach((t) => closeOrder(state, t.id));
};

const maybeOpenPosition = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    currentPrice: number
) => {
    state.openOrders
        .filter(isPendingOrder)
        .filter((t) => hasToBeTriggered(t, currentPrice))
        .forEach((t) => openOrder(state, t.id));
};

export const tradeSlice = createSlice({
    name: 'trade',
    initialState: {
        openOrders: [] as Order[],
        closedOrders: [] as Order[],
        currentCandle: undefined as CandlestickData | undefined,
        selectedTradeId: undefined as string | undefined,
    },
    reducers: {
        changeCurrentPrice: (state, action: PayloadAction<CandlestickData>) => {
            state.currentCandle = action.payload;
            state.openOrders.filter(isTriggered).forEach((p) => {
                p.profit = calculateProfit(p, action.payload.close);
            });
            maybeClosePosition(state, action.payload.close);
            maybeOpenPosition(state, action.payload.close);
        },
        changedOrderPrice: (
            state,
            action: PayloadAction<{
                tradeId: string;
                newPrice: number;
                orderType: OrderType;
            }>
        ) => {
            const trade = state.openOrders.find(
                (p) => p.id === action.payload.tradeId
            );
            if (trade) {
                if (action.payload.orderType === OrderType.TAKE_PROFIT) {
                    trade.takeProfitPrice = action.payload.newPrice;
                }
                if (action.payload.orderType === OrderType.STOP_LOSS) {
                    trade.stopLossPrice = action.payload.newPrice;
                }
                if (
                    [
                        OrderType.SELL_LIMIT,
                        OrderType.BUY_LIMIT,
                        OrderType.SELL_STOP,
                        OrderType.BUY_STOP,
                    ].includes(action.payload.orderType)
                ) {
                    trade.price = action.payload.newPrice;
                }
            }
        },
        openMarketLong: (state) => {
            if (state.currentCandle) {
                const t = new Date(
                    state.currentCandle.time as string
                ).getTime();
                const id = generateTradeId();
                state.openOrders.push({
                    id,
                    creationTimestamp: t,
                    triggeredTimestamp: t,
                    type: OrderType.MARKET_LONG,
                    isTriggered: true,
                    price: state.currentCandle.close,
                    closePrice: undefined,
                    profit: undefined,
                });
            }
        },
        tradeSelected: (state, action: PayloadAction<string | undefined>) => {
            state.selectedTradeId = action.payload;
        },
        closeTrade: (state, action: PayloadAction<string>) => {
            closeOrder(state, action.payload);
        },
        takeProfitUpdated: (state, action: PayloadAction<number>) => {
            const selectedTrade = state.openOrders.find(
                (t) => t.id === state.selectedTradeId
            )!;
            selectedTrade.takeProfitPrice = action.payload;
        },
        stopLossUpdated: (state, action: PayloadAction<number>) => {
            const selectedTrade = state.openOrders.find(
                (t) => t.id === state.selectedTradeId
            )!;
            selectedTrade.stopLossPrice = action.payload;
        },
        openMarketShort: (state) => {
            if (state.currentCandle) {
                const t = new Date(
                    state.currentCandle.time as string
                ).getTime();
                const id = generateTradeId();
                state.openOrders.push({
                    id,
                    triggeredTimestamp: t,
                    creationTimestamp: t,
                    type: OrderType.MARLET_SHORT,
                    isTriggered: true,
                    price: state.currentCandle.close,
                    closePrice: undefined,
                    profit: undefined,
                });
            }
        },
        addFixedRiskOrder: (
            state,
            action: PayloadAction<{ entryPrice: number; stopLossPrice: number }>
        ) => {
            const id = generateTradeId();
            const t = new Date(state.currentCandle!.time as string).getTime();
            state.openOrders.push({
                id,
                creationTimestamp: t,
                isTriggered: false,
                type: getOrderType(
                    state.currentCandle?.close!,
                    action.payload.entryPrice,
                    action.payload.stopLossPrice
                ),
                price: action.payload.entryPrice,
                stopLossPrice: action.payload.stopLossPrice,
            });
        },
    },
});

export const {
    openMarketLong,
    openMarketShort,
    changeCurrentPrice,
    takeProfitUpdated,
    tradeSelected,
    changedOrderPrice,
    closeTrade,
    stopLossUpdated,
    addFixedRiskOrder,
} = tradeSlice.actions;
