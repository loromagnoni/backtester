import { Select } from '@chakra-ui/react';
import useChangeAsset from 'app/hooks/asset/useChangeAsset';
import useGetAvailableAssets from 'app/hooks/asset/useAvailableAssets';
import useSelectedAsset from 'app/hooks/asset/useSelectedAsset';

function AssetSelector() {
  const changeAsset = useChangeAsset();
  const availableAssets = useGetAvailableAssets();
  const selectedAsset = useSelectedAsset();
  return (
    <Select
      placeholder="Select asset"
      minW={40}
      variant="outline"
      value={selectedAsset.label}
      onChange={(e) => changeAsset({ label: e.target.value })}
    >
      {availableAssets.map((asset) => (
        <option key={asset.label} value={asset.label}>
          {asset.label}
        </option>
      ))}
    </Select>
  );
}

export default AssetSelector;
