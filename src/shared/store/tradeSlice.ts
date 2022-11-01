import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { truncateDecimals } from 'core/converter';
import { addPositionLine, clearLines, updateMarkers } from 'features/chart';
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
        currentCandle: undefined as CandlestickData | undefined,
        markers: [] as Marker[],
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
                state.openPositions.push({
                    id: generateTradeId(),
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
                        state.currentCandle.time,
                        1.0,
                        state.currentCandle.close
                    )
                );
                updateMarkers(state.markers);
            }
        },
        openShortPosition: (state) => {
            if (state.currentCandle) {
                state.openPositions.push({
                    id: generateTradeId(),
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

export const { openLongPosition, openShortPosition, changeCurrentPrice } =
    tradeSlice.actions;
