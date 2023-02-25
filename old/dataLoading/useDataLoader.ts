import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { CandlestickData } from 'core/lightweight-chart/lightweight-charts.js';
import { useCallback, useEffect } from 'react';
import { assetQuery } from 'shared/services/assetService';
import {
    appendAssetSerie,
    setAssetSeries,
    useAppDispatch,
    useAppSelector,
} from 'shared/store';
import { loadNextChunk, setIsLoading } from 'shared/store/dataLoaderSlice';
const minutesInAWeek = 60 * 24 * 7;

const triggerReload = (dataLength: number, index: number) =>
    dataLength - index < minutesInAWeek;

export const useDataLoader = () => {
    const dispatch = useAppDispatch();
    const dataLength = useAppSelector((state) => state.app.assetSerie.length);
    const currentIndex = useAppSelector((state) => state.app.index);
    const toast = useToast();
    const lastChunk = useAppSelector((state) => state.dataLoader.lastChunk);
    const needsReload = useAppSelector((state) => state.dataLoader.needsReload);

    const onSuccess = useCallback(
        (serie: CandlestickData[]) => {
            needsReload
                ? dispatch(appendAssetSerie(serie))
                : dispatch(setAssetSeries(serie));
        },
        [dispatch, needsReload]
    );

    const onError = useCallback(() => {
        if (!needsReload) {
            toast({
                title: 'Data not available',
                description:
                    "The data for the selected asset isn't available yet",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            dispatch(setAssetSeries([]));
        }
    }, [dispatch, needsReload, toast]);

    const { isLoading, isError } = useQuery(
        [JSON.stringify(lastChunk)],
        assetQuery(lastChunk),
        {
            onSuccess: onSuccess,
            onError: onError,
            retry: 1,
        }
    );

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [dispatch, isLoading]);

    useEffect(() => {
        if (triggerReload(dataLength, currentIndex) && !isLoading && !isError) {
            dispatch(loadNextChunk());
        }
    }, [currentIndex, dataLength, dispatch, isError, isLoading]);
};
