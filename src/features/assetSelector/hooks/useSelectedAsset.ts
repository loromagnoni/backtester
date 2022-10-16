import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { withLogger } from "../../../core/withLogger";
import { CandleStickSerieData } from "../../chart";
import { AssetData } from "../data/assets";

const chartAdapter = (data: any): CandleStickSerieData=> {
    return data.map((item: any) => ({
        time: item['Local time'],
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
    }));
};

const assetQuery = (selectedAsset?:AssetData) => async () => {
    if (selectedAsset) {
        const response = await fetch(selectedAsset.url);
        const data = chartAdapter(await response.json());
        console.log('query')
        return data;
    }
}


export const useSelectedAsset = () => {
    const [selectedAsset, setSelectedAsset] = useState<AssetData>();
    const [selectedAssetSerie, setSelectedAssetSerie] = useState<CandleStickSerieData>([]);

    useQuery(['selectedAsset', selectedAsset], assetQuery(selectedAsset), {
        enabled: !!selectedAsset,
        onSuccess: () => {
            console.log('success')
            setSelectedAssetSerie([   {
                time: '2018-10-19',
                open: 180.34,
                high: 180.99,
                low: 178.57,
                close: 179.85
              },])
        }
    });
    
    return { setSelectedAsset, selectedAssetSerie }
}