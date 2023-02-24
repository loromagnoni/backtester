import { Select } from '@chakra-ui/react';
import useChangeAsset from 'app/hooks/useChangeAsset';
import useGetAvailableAssets from 'app/hooks/useGetAvailableAssets';

function AssetSelector() {
  const changeAsset = useChangeAsset();
  const availableAssets = useGetAvailableAssets();
  return (
    <Select
      placeholder="Select asset"
      minW={40}
      variant="outline"
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
