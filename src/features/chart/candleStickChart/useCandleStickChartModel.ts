import { changedOrderPrice, useAppDispatch } from 'shared/store';

import { ColorType, createChart, CrosshairMode } from 'core/lightweight-chart';
import { useEffect, useRef } from 'react';
import {
    chart,
    getOrderTypeFromPriceLine,
    getPriceFromPriceLine,
    getTradeIdFromPriceLine,
    setChart,
    setSerie,
} from 'shared/services/chartService';

import { useMarkers } from './useMarkers';
import { usePriceLines } from './usePriceLines';
import { usePositionLines } from './usePositionLines';
import { useResetChart } from './useResetChart';
import { useLastCandle } from './useLastCandle';
import { useSelectedPriceLine } from './useSelectedPriceLine';

export const colors = {
    priceFormat: {
        type: 'price' as const,
        precision: 6,
        minMove: 0.000001,
    },
    background: '#253248',
    line: 'gray',
    text: 'rgba(255, 255, 255, 0.9)',
    downColor: '#ff4976',
    borderDownColor: '#ff4976',
    borderUpColor: '#4bffb5',
    wickDownColor: '#838ca1',
    wickUpColor: '#838ca1',
    grid: {
        vertLines: {
            color: '#334158',
        },
        horzLines: {
            color: '#334158',
        },
    },
    crosshair: {
        mode: CrosshairMode.Normal,
    },
    priceScale: {
        borderColor: '#485c7b',
    },
    timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        secondsVisible: true,
    },
};

export const useCandleStickChartModel = () => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    usePriceLines();
    useMarkers();
    usePositionLines();
    useResetChart();
    useLastCandle();
    useSelectedPriceLine();

    useEffect(() => {
        const handleResize = () => {
            chart?.applyOptions({
                width: ref.current!.clientWidth,
                height: ref.current!.clientHeight,
                ...colors,
            });
        };
        setChart(
            createChart(ref.current!, {
                layout: {
                    background: {
                        type: ColorType.Solid,
                        color: colors.background,
                    },
                    textColor: colors.text,
                },
                width: ref.current!.clientWidth,
                height: ref.current!.clientHeight,
                ...colors,
            })
        );
        chart?.timeScale().fitContent();
        chart?.subscribeCustomPriceLineDragged((p) =>
            dispatch(
                changedOrderPrice({
                    tradeId: getTradeIdFromPriceLine(p),
                    newPrice: getPriceFromPriceLine(p),
                    orderType: getOrderTypeFromPriceLine(p),
                })
            )
        );
        setSerie(chart!.addCandlestickSeries(colors));
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart?.remove();
        };
    }, [dispatch, ref]);
    return { chartContainerRef: ref };
};
