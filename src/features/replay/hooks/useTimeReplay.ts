import { ISeriesApi } from "lightweight-charts";
import { useRef } from "react";


export const useTimeReplay = () => {
    console.log('called replay');
    const index = useRef(0);
    const setTimeSerieToReplay = (data:any, serie: ISeriesApi<"Candlestick">) => {
        serie.setData([]);
        setInterval(()=>{
            serie.update(data[index.current % data.length]);
           index.current++;
        }, 1000);
    };
    return setTimeSerieToReplay;
}