import {
  CandlestickData,
  CustomPriceLineDraggedEventParams,
  IChartApi,
  IPriceLine,
  ISeriesApi,
  LineData,
  LineStyle,
  MouseEventHandler,
  SeriesMarkerPosition,
  SeriesMarkerShape,
  WhitespaceData,
} from 'core/lightweight-chart';

let serie: ISeriesApi<'Candlestick'> | undefined;
let chart: IChartApi | undefined;
export const lines = [] as ISeriesApi<'Line'>[];
const priceLines = [] as IPriceLine[];

export const setChart = (c: IChartApi) => {
  chart = c;
};
export const setSerie = (s: ISeriesApi<'Candlestick'>) => {
  serie = s;
};

export const setChartSerie = (data: (CandlestickData | WhitespaceData)[]) => {
  serie?.setData(data);
};

export const updateChartSerie = (data: CandlestickData | WhitespaceData) =>
  serie?.update(data);

export const clearPriceLines = () => {
  priceLines.forEach((l) => serie?.removePriceLine(l));
  priceLines.length = 0;
};

export const clearLines = () => {
  lines.forEach((l) => chart?.removeSeries(l));
  lines.length = 0;
};

export const updateMarkers = (m: Marker[]) => serie?.setMarkers(m);

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

type PriceLineOptions = {
  price: number;
  color: string;
  lineStyle: LineStyle;
  title: string;
};

const createPriceLine = (
  price: number,
  color: string,
  lineStyle: LineStyle,
  title: string
) => {
  return serie?.createPriceLine({
    price,
    color,
    lineWidth: 1,
    lineVisible: true,
    lineStyle,
    axisLabelVisible: true,
    draggable: true,
    title,
  });
};

export const addPriceLine = ({
  price,
  color,
  lineStyle,
  title,
}: PriceLineOptions) => {
  const priceLine = createPriceLine(price, color, lineStyle, title);
  priceLines.push(priceLine!);
};

export type Marker = {
  tradeId: string;
  time: any;
  position: SeriesMarkerPosition;
  color: string;
  shape: SeriesMarkerShape;
  text: string;
};

export const getBuyMarker = (
  tradeId: string,
  time: any,
  size: number,
  price: number
): Marker => {
  return {
    tradeId,
    time,
    position: 'belowBar',
    color: '#FFFFFF',
    shape: 'circle',
    text: `#${tradeId} Buy ${size} @ ${price}`,
  };
};

export const getSellMarker = (
  tradeId: string,
  time: any,
  size: number,
  price: number
): Marker => {
  return {
    tradeId,
    time,
    position: 'aboveBar',
    color: '#FFFFFF',
    shape: 'circle',
    text: `#${tradeId} Sell ${size} @ ${price}`,
  };
};

export const getTradeIdFromPriceLine = (
  p: CustomPriceLineDraggedEventParams
): string =>
  p.customPriceLine.options().title?.split(' ')[0].replace('#', '') ?? '';

export const getPriceFromPriceLine = (
  p: CustomPriceLineDraggedEventParams
): number => p.customPriceLine.options().price;

const clickSubscribers: MouseEventHandler[] = [];

export const chartSubscribeClick = (callback: MouseEventHandler) => {
  clickSubscribers.push(callback);
  chart?.subscribeClick(callback);
};

export const chartUnsubscribeAllClick = () => {
  clickSubscribers.forEach((c) => chart?.unsubscribeClick(c));
  clickSubscribers.length = 0;
};

export const getPriceAtY = (y: number) => {
  return serie?.coordinateToPrice(y);
};

let selectedPriceLine: IPriceLine | undefined;

export const setSelectedPriceLine = (price?: number) => {
  if (price) {
    selectedPriceLine = createPriceLine(
      price,
      '#696969',
      LineStyle.Dotted,
      'Selected price'
    );
  } else {
    if (selectedPriceLine) {
      serie?.removePriceLine(selectedPriceLine);
    }
    selectedPriceLine = undefined;
  }
};
