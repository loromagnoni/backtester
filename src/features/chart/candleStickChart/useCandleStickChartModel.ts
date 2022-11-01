import { useAppDispatch } from 'shared/store';
import {
    CandlestickData,
    ColorType,
    createChart,
    CrosshairMode,
    IChartApi,
    ISeriesApi,
    LineData,
    SeriesMarker,
    Time,
    WhitespaceData,
} from 'lightweight-charts';
import { useEffect, useRef } from 'react';

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

let serie: ISeriesApi<'Candlestick'> | undefined;
let chart: IChartApi | undefined;

export const setChartSerie = (data: (CandlestickData | WhitespaceData)[]) => {
    serie?.setData(data);
    chart?.timeScale().fitContent();
};

export const updateChartSerie = (data: CandlestickData | WhitespaceData) =>
    serie?.update(data);

export const updateMarkers = (m: SeriesMarker<Time>[]) => serie?.setMarkers(m);

const lines = [] as ISeriesApi<'Line'>[];

export const addPositionLine = (data: LineData[], color: string) => {
    const lineSerie = chart!.addLineSeries({
        color,
        lineWidth: 1,
        lineStyle: 2,
        priceLineVisible: false,
        lastValueVisible: false,
    });
    lineSerie.setData(data);
    lines.push(lineSerie);
};

export const clearLines = () => {
    lines.forEach((l) => chart?.removeSeries(l));
    lines.length = 0;
};

export const useCandleStickChartModel = () => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            chart?.applyOptions({
                width: ref.current!.clientWidth,
                height: ref.current!.clientHeight,
                ...colors,
            });
        };
        chart = createChart(ref.current!, {
            layout: {
                background: { type: ColorType.Solid, color: colors.background },
                textColor: colors.text,
            },
            width: ref.current!.clientWidth,
            height: ref.current!.clientHeight,
            ...colors,
        });
        chart.timeScale().fitContent();
        serie = chart.addCandlestickSeries(colors);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart?.remove();
        };
    }, [dispatch, ref]);
    return { chartContainerRef: ref };
};
