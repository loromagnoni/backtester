import { ColorType, createChart, CrosshairMode } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { SerieProvider } from '../../../shared/services/chartService';
import { useSerieProvider } from './useSerieProvider';

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
    const { serieProvider } = useSerieProvider();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    useChart(chartContainerRef, colors, serieProvider);
    return { chartContainerRef };
};

const useChart = (
    ref: React.RefObject<HTMLDivElement>,
    colors: any,
    serieProvider: SerieProvider
) => {
    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({
                width: ref.current!.clientWidth,
                height: ref.current!.clientHeight,
                ...colors,
            });
        };
        const chart = createChart(ref.current!, {
            layout: {
                background: { type: ColorType.Solid, color: colors.background },
                textColor: colors.text,
            },
            width: ref.current!.clientWidth,
            height: ref.current!.clientHeight,
            ...colors,
        });
        chart.timeScale().fitContent();
        serieProvider(chart);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [colors, ref, serieProvider]);
};
