import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'app/tree/App';
import assetRepository from 'dependencies/repositories/assetRepository/assetRepository';
import SerieNotFoundError from 'domain/dependencies/repositories/assetRepository/errors';
import Asset from 'domain/models/asset';

const mockSerie = [
  {
    time: 1640991600,
    open: 1.13667,
    high: 1.13667,
    low: 1.13667,
    close: 1.13667,
  },
  {
    time: 1640991660,
    open: 1.13667,
    high: 1.13667,
    low: 1.13667,
    close: 1.13667,
  },
];

it('Shows an error toast when asset data is not available', async () => {
  const mockedAssetRepository = assetRepository();
  mockedAssetRepository.getAssetSerie = jest.fn(async (asset: Asset) =>
    asset.label === 'GBPUSD' ? new SerieNotFoundError() : mockSerie
  );
  const user = userEvent.setup();
  render(
    <App
      dependencies={{
        assetRepository: mockedAssetRepository,
      }}
    />
  );
  await user.selectOptions(screen.getByTestId('asset-selector'), 'GBPUSD');
  expect(screen.getByText('Data not available')).toBeInTheDocument();
});
