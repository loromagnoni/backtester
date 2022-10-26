import { CandleStickSerieData } from '../../chart';

export const onlyOpenMarketHours = (item: CandleStickSerieData[0]): boolean => {
    const date = new Date((item.time as number) * 1000);
    const day = date.getDay();
    const hour = date.getHours();
    return !(
        (day === 5 && hour >= 21) ||
        day === 6 ||
        (day === 0 && hour < 21)
    );
};
