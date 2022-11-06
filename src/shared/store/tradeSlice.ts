import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { truncateDecimals } from 'core/converter';
import {
    CandlestickData,
    UTCTimestamp,
} from 'core/lightweight-chart/lightweight-charts.js';
import {
    addPositionLine,
    clearLines,
    clearPriceLines,
    updateMarkers,
} from 'features/chart';
import {
    calculateProfit,
    drawStopLossLine,
    drawTakeProfitLine,
    generateTradeId,
    getBuyMarker,
    getSellMarker,
    hasToBeClosed,
    Marker,
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

const updatePriceLines = (
    state: ReturnType<typeof tradeSlice.getInitialState>
) => {
    clearPriceLines();
    state.openPositions.forEach(drawTakeProfitLine);
    state.openPositions.forEach(drawStopLossLine);
};

const closePosition = (
    state: ReturnType<typeof tradeSlice.getInitialState>,
    tradeId: string
) => {
    const toClose = state.openPositions.find((t) => t.id === tradeId)!;
    state.closedPositions.push(toClose);
    state.openPositions = state.openPositions.filter((t) => t.id !== tradeId);
    state.markers = state.markers.filter((m) => m.tradeId !== tradeId);
    updateMarkers(state.markers);
    updatePriceLines(state);
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
        markers: [] as Marker[],
        selectedTradeId: undefined as string | undefined,
    },
    reducers: {
        changeCurrentPrice: (state, action: PayloadAction<CandlestickData>) => {
            state.currentCandle = action.payload;
            state.openPositions.forEach((p) => {
                p.profit = calculateProfit(p, action.payload.close);
            });
            clearLines();
            maybeClosePosition(state, action.payload.close);
            state.openPositions.forEach((p) =>
                addPositionLine(
                    [
                        {
                            value: p.entryPrice,
                            time: p.entryTimestamp as UTCTimestamp,
                        },
                        {
                            value: state.currentCandle!.close,
                            time: state.currentCandle!.time,
                        },
                    ],
                    p.type === TradeType.LONG ? '#4bffb5' : '#ff4976'
                )
            );
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
                updatePriceLines(state);
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
                state.markers.push(
                    getBuyMarker(
                        id,
                        state.currentCandle.time,
                        1.0,
                        state.currentCandle.close
                    )
                );
                updateMarkers(state.markers);
            }
        },
        tradeSelected: (state, action: PayloadAction<string>) => {
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
            updatePriceLines(state);
        },
        stopLossUpdated: (state, action: PayloadAction<number>) => {
            const selectedTrade = state.openPositions.find(
                (t) => t.id === state.selectedTradeId
            )!;
            selectedTrade.stopLossPrice = action.payload;
            updatePriceLines(state);
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
                state.markers.push(
                    getSellMarker(
                        id,
                        state.currentCandle.time,
                        1.0,
                        state.currentCandle.close
                    )
                );
                updateMarkers(state.markers);
            }
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
} = tradeSlice.actions;
