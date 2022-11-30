export type AssetData = {
    ticker: string;
    url: string;
    start: number;
    end: number;
};

export const assets: AssetData[] = [
    {
        ticker: 'EURUSD',
        url: '/data/EURUSD_1m_20220901.json',
        start: new Date('2022-09-01').getTime(),
        end: new Date('2022-09-30').getTime(),
    },
    {
        ticker: 'GBPUSD',
        url: '/data/GBPUSD_1m_20220901.json',
        start: new Date('2022-09-01').getTime(),
        end: new Date('2022-09-30').getTime(),
    },
];
