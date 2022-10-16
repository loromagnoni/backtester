type AssetData = {
    ticker: string;
    url: string;
    start: Date;
    end: Date;
}

export const assets: AssetData[] = [{
    ticker: 'EURUSD',
    url: '/data/EURUSD_1m_01092022.json',
    start: new Date('2022-09-01'),
    end: new Date('2022-09-30')
}];