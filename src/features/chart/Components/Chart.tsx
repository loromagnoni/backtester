import { Box } from '@chakra-ui/react';
import { ColorType, createChart, CrosshairMode } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { priceData } from '../data/priceData';

type ChartProps = {
    data: { time: string; value: number }[];
};

const colors = {
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
    },
};

export const Chart = (props: ChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current!.clientWidth,
                height: chartContainerRef.current!.clientHeight,
                ...colors,
            });
        };
        const chart = createChart(chartContainerRef.current!, {
            layout: {
                background: { type: ColorType.Solid, color: colors.background },
                textColor: colors.text,
            },
            width: chartContainerRef.current!.clientWidth,
            height: chartContainerRef.current!.clientHeight,
        });
        chart.timeScale().fitContent();

        const newSeries = chart.addCandlestickSeries(colors);
        newSeries.setData(priceData);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return <Box ref={chartContainerRef} h={'full'}></Box>;
};
