import { timeframes } from '../data/timeframes';

export const useTimeframes = () => {
    const findTimeframeByLabel = (label: string) =>
        timeframes.find((t) => t.label === label);
    return { timeframes, findTimeframeByLabel };
};
