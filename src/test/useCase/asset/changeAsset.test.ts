import changeAsset from 'domain/useCase/asset/changeAsset';

test('Should not change asset if data is not available', async () => {
  const isAssetDataAvailable = jest.fn(async () => false);
  const stateSetter = jest.fn();
  const resetChart = jest.fn();
  await changeAsset({
    isAssetDataAvailable,
    replayDate: new Date(),
    resetChart,
    stateSetter,
    newAssetSelected: { label: 'asset' },
  });
  expect(isAssetDataAvailable).toBeCalled();
  expect(stateSetter).not.toBeCalled();
  expect(resetChart).not.toBeCalled();
});

test('Should change asset  if data is available', async () => {
  const isAssetDataAvailable = jest.fn(async () => true);
  const stateSetter = jest.fn();
  const resetChart = jest.fn();
  await changeAsset({
    isAssetDataAvailable,
    replayDate: new Date(),
    resetChart,
    stateSetter,
    newAssetSelected: { label: 'asset' },
  });
  expect(isAssetDataAvailable).toBeCalled();
  expect(stateSetter).toBeCalled();
  expect(resetChart).toBeCalled();
});
