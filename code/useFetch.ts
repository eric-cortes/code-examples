// import useSWR from 'swr';

// const fetcher = (url: string) =>
//     fetch(url).then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch');
//         return res.json();
//     });

// const useFetch = (url: string, options?: any) => {
//     const { data, error, isLoading, isValidating } = useSWR(url, fetcher, {
//         ...options, // Spread the options object to pass to useSWR
//     });

//     return { data, error, isLoading, isValidating };
// };

// export default useFetch;

import useSWR from 'swr';
import { useEffect, useState } from 'react';

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    });

const useFetch = (url: string | null, options?: any) => {
    const { data, error, isValidating } = useSWR(url ? url : null, fetcher, {
        ...options,
    });

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const isLoading = isInitialLoad || isValidating;

    useEffect(() => {
        if (!isValidating) {
            setIsInitialLoad(false);
        }
    }, [isValidating]);

    return { data, error, isLoading, isValidating };
};

export default useFetch;


