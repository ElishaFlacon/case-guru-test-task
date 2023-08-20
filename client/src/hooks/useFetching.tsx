import { useState } from "react";


export type UFHook = (callback: Function) => [fetching: Function, isLoading: boolean, error: string];


export const useFetching: UFHook = (callback: Function) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...rest: any[]) => {
        setError('');

        try {
            setIsLoading(true);
            await callback(...rest);
        } catch (error: any) {
            setError(error.message);
            if (error?.response?.data?.message) {
                setError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}