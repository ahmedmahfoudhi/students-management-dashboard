import { useEffect, useState } from 'react';
const useDebounceValue = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => { 

        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        console.log(`Created timer for ${value} with delay ${delay}`);
        return () => {
            clearTimeout(timer);
            console.log(`Cleared timer for ${value} with delay ${delay}`);
        }
    }, [value, delay])
    return debouncedValue;
}

export default useDebounceValue;