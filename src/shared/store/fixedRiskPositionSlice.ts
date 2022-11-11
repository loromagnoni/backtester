import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fixedRiskPositionSlice = createSlice({
    name: 'fixedRiskPositionMode',
    initialState: {
        isActive: false,
        selectedPrice: undefined as number | undefined,
        selectedStopLoss: undefined as number | undefined,
    },
    reducers: {
        onPriceSelected: (state, action: PayloadAction<any>) => {
            if (!state.selectedPrice) {
                state.selectedPrice = action.payload;
                return;
            }
            state.selectedStopLoss = action.payload;
        },
        enterCreateFixedRiskPositionMode: (state) => {
            state.isActive = true;
        },
        exitCreateFixedRiskPositionMode: (state) => {
            state.isActive = false;
            state.selectedPrice = undefined;
            state.selectedStopLoss = undefined;
        },
    },
});

export const {
    onPriceSelected,
    enterCreateFixedRiskPositionMode,
    exitCreateFixedRiskPositionMode,
} = fixedRiskPositionSlice.actions;
