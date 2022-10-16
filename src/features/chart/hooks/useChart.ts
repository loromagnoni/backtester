import { ColorType, createChart, IChartApi } from "lightweight-charts";
import React, { useEffect } from "react";
import { usePriceData } from "./usePriceData";

export type SerieProvider = (chart:IChartApi)=>void;

export const useChart = (ref:React.RefObject<HTMLDivElement>, colors:any, serieProvider:SerieProvider) => {
    const priceData = usePriceData();
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
            ...colors
        });
        chart.timeScale().fitContent();
        serieProvider(chart);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [colors, priceData, ref, serieProvider]);
    }