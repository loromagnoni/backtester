import { useEffect } from 'react';

export const useLogDepChange = (dep: any, title: string) => {
    useEffect(() => {
        console.log(`${title} changed!`);
    }, [dep, title]);
};
