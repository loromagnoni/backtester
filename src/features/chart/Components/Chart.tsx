import { Box } from '@chakra-ui/react';
import { CrosshairMode } from 'lightweight-charts';
import { useRef } from 'react';
import { useChart, usePriceData } from '../hooks';
import { useFixedSerieProvider } from '../hooks/fixedSerieProvider';

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

export const Chart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const serieProvider = useFixedSerieProvider(colors, usePriceData());
    useChart(chartContainerRef, colors, serieProvider);
    return <Box ref={chartContainerRef} w="full"></Box>;
};
