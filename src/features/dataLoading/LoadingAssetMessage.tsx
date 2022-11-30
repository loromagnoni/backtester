import { useAppSelector } from 'shared/store';

export const LoadingAssetMessage = () => {
    const isLoading = useAppSelector((state) => state.dataLoader.isLoading);
    return isLoading ? <div>Loading...</div> : null;
};
