let index: { current: number | undefined } = {
    current: undefined,
};

const setLastIndex = (i: number) => (index.current = i);

export const useLastIndex = () => {
    return [index, setLastIndex] as const;
};
