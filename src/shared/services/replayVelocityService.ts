import { velocityOptions } from '../data/velocityOption';

export const velocityLabels = velocityOptions.map((v) => v.label);

export const findVelocityOptionByLabel = (label: number) =>
    velocityOptions.find((o) => o.label === label)!;

export const findVelocityOptionByUpdates = (u: number) =>
    velocityOptions.find((o) => o.updatesPerSecond === u)!;
