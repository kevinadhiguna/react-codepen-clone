import { useState, useEffect } from 'react';

const PREFIX = 'codepen-react-'; // Prefix for items stored in localStorage. In case tons of items are stored in localStorage.

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key; // combine PREFIX string and key name 
    
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        
        if (jsonValue != null) return JSON.parse(jsonValue);
        
        if (typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value]);

    return [value, setValue];
}
