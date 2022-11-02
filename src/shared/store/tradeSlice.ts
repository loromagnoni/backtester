import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { truncateDecimals } from 'core/converter';
import {
    addPositionLine,
    addPriceLine,
    clearLines,
    clearPriceLines,
    updateMarkers,
} from 'features/chart';
import { CandlestickData, UTCTimestamp } from 'lightweight-charts';
import {
    calculateProfit,
    generateTradeId,
    getBuyMarker,
    getSellMarker,
    Marker,
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
            const toClose = state.openPositions.find(
                (t) => t.id === action.payload
            )!;
            state.closedPositions.push(toClose);
            state.openPositions = state.openPositions.filter(
                (t) => t.id !== action.payload
            );
            state.markers = state.markers.filter(
                (m) => m.tradeId !== action.payload
            );
            updateMarkers(state.markers);
        },
        takeProfitUpdated: (state, action: PayloadAction<number>) => {
            const selectedTrade = state.openPositions.find(
                (t) => t.id === state.selectedTradeId
            )!;
            selectedTrade.takeProfitPrice = action.payload;
            clearPriceLines();
            state.openPositions.forEach((p) => {
                if (p.takeProfitPrice) {
                    addPriceLine(p.takeProfitPrice, '#4bffb5');
                }
            });
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
    closeTrade,
} = tradeSlice.actions;
