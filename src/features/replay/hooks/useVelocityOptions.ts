import { velocityOptions } from '../data/velocityOption';

export const useVelocityOptions = () => {
    const labels = velocityOptions.map((v) => v.label);
    const findOptionByLabel = (label: number) =>
        velocityOptions.find((o) => o.label === label)!;
    const findOptionByUpdates = (u: number) =>
        velocityOptions.find((o) => o.updatesPerSecond === u)!;
    return { labels, findOptionByLabel, findOptionByUpdates };
};
