type VelocityOption = {
    label: number;
    updatesPerSecond: number;
};

export const velocityOptions: VelocityOption[] = [
    {
        label: 0,
        updatesPerSecond: 0,
    },
    {
        label: 1,
        updatesPerSecond: 1,
    },
    {
        label: 2,
        updatesPerSecond: 5,
    },
    {
        label: 3,
        updatesPerSecond: 10,
    },
    {
        label: 4,
        updatesPerSecond: 50,
    },
    {
        label: 5,
        updatesPerSecond: 100,
    },
];
