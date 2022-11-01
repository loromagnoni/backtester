import { useEffect, useRef, useState } from 'react';

export const useThrottle = <T>(value: T, throttle: number): T => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(function () {
            if (Date.now() - lastRan.current >= throttle) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, throttle - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    }, [value, throttle]);

    return throttledValue;
};
