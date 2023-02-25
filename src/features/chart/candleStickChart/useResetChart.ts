import { useEffect } from 'react';
import { getCandlesIndexUntilDate } from 'shared/services/candleCalculatorService';
import { setChartSerie } from 'shared/services/chartService';
import { applyTimeframe } from 'shared/services/timeframeService';
import { resetReplay, useAppDispatch, useAppSelector } from 'shared/store';

export default useResetChart = () => {
  const startingReplayTimestamp = useAppSelector(
    (state) => state.app.startingReplayTimestamp
  );
  const assetSerie = useAppSelector((state) => state.app.assetSerie);
  const timeframe = useAppSelector((state) => state.app.timeframe);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialIndex =
      getCandlesIndexUntilDate(assetSerie, new Date(startingReplayTimestamp)) ??
      0;
    const timeframeAdapted = applyTimeframe(
      assetSerie.slice(0, initialIndex),
      timeframe
    );
    setChartSerie(timeframeAdapted);
    dispatch(
      resetReplay({
        candle: timeframeAdapted[timeframeAdapted.length - 1],
        initialIndex,
      })
    );
  }, [assetSerie, timeframe, startingReplayTimestamp, dispatch]);
};
