import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { truncateDecimals } from 'core/converter';
import { CandlestickData } from 'core/lightweight-chart/lightweight-charts.js';
import {
    calculateProfit,
    generateTradeId,
    hasToBeClosed,
    OrderType,
    Trade,
    TradeType,
} from 'shared/services/tradeService';
import { RootState } from './store';

export const totalProfitSelector = (state: RootState) =>
    truncateDecimals(
        state.trade.openPositions.reduce(
            (acc, trade) => acc + (trade.profit ?? 0),
            0
        ),
        2
    );

const closePosition = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    tradeId: string
) => {
    const toClose = state.openPositions.find((t) => t.id === tradeId)!;
    state.closedPositions.push(toClose);
    state.openPositions = state.openPositions.filter((t) => t.id !== tradeId);
};

const maybeClosePosition = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    currentPrice: number
) => {
    state.openPositions
        .filter((t) => hasToBeClosed(t, currentPrice))
        .forEach((t) => closePosition(state, t.id));
};

export const tradeSlice = createSlice({
    name: 'trade',
    initialState: {
        openPositions: [] as Trade[],
        closedPositions: [] as Trade[],
        currentCandle: undefined as CandlestickData | undefined,
        selectedTradeId: undefined as string | undefined,
    },
    reducers: {
        changeCurrentPrice: (state, action: PayloadAction<CandlestickData>) => {
            state.currentCandle = action.payload;
            state.openPositions.forEach((p) => {
                p.profit = calculateProfit(p, action.payload.close);
            });
            maybeClosePosition(state, action.payload.close);
        },
        changedTradePrice: (
            state,
            action: PayloadAction<{
                tradeId: string;
                newPrice: number;
                orderType?: OrderType;
            }>
        ) => {
            const trade = state.openPositions.find(
                (p) => p.id === action.payload.tradeId
            );
            if (trade) {
                if (action.payload.orderType === OrderType.TP) {
                    trade.takeProfitPrice = action.payload.newPrice;
                }
                if (action.payload.orderType === OrderType.SL) {
                    trade.stopLossPrice = action.payload.newPrice;
                }
            }
        },
        openLongPosition: (state) => {
            if (state.currentCandle) {
                const id = generateTradeId();
                state.openPositions.push({
                    id,
                    entryTimestamp: new Date(
                        state.currentCandle.time as string
                    ).getTime(),
                    type: TradeType.LONG,
                    entryPrice: state.currentCandle.close,
                    closePrice: undefined,
                    profit: undefined,
                });
            }
        },
        tradeSelected: (state, action: PayloadAction<string | undefined>) => {
            state.selectedTradeId = action.payload;
        },
        closeTrade: (state, action: PayloadAction<string>) => {
            closePosition(state, action.payload);
        },
        takeProfitUpdated: (state, action: PayloadAction<number>) => {
            const selectedTrade = state.openPositions.find(
                (t) => t.id === state.selectedTradeId
            )!;
            selectedTrade.takeProfitPrice = action.payload;
        },
        stopLossUpdated: (state, action: PayloadAction<number>) => {
            const selectedTrade = state.openPositions.find(
                (t) => t.id === state.selectedTradeId
            )!;
            selectedTrade.stopLossPrice = action.payload;
        },
        openShortPosition: (state) => {
            if (state.currentCandle) {
                const id = generateTradeId();
                state.openPositions.push({
                    id,
                    entryTimestamp: new Date(
                        state.currentCandle.time as string
                    ).getTime(),
                    type: TradeType.SHORT,
                    entryPrice: state.currentCandle.close,
                    closePrice: undefined,
                    profit: undefined,
                });
            }
        },
        openFixedRiskPosition: (
            state,
            action: PayloadAction<{ entryPrice: number; stopLossPrice: number }>
        ) => {
            const id = generateTradeId();
            state.openPositions.push({
                id,
                entryTimestamp: new Date(
                    state.currentCandle!.time as string
                ).getTime(),
                type:
                    action.payload.stopLossPrice <= action.payload.entryPrice
                        ? TradeType.LONG
                        : TradeType.SHORT,
                entryPrice: action.payload.entryPrice,
                stopLossPrice: action.payload.stopLossPrice,
                closePrice: undefined,
                profit: undefined,
            });
        },
    },
});

export const {
    openLongPosition,
    openShortPosition,
    changeCurrentPrice,
    takeProfitUpdated,
    tradeSelected,
    changedTradePrice,
    closeTrade,
    stopLossUpdated,
    openFixedRiskPosition,
} = tradeSlice.actions;
