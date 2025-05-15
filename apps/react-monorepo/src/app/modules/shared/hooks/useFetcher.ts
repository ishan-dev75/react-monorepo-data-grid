import { useState, useEffect, useCallback } from "react";

type FetcherState<T> = {
    data: T | null;
    error: Error | null;
    loading: boolean;
};

type FetcherOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"; // HTTP methods
    body?: any; // Request body for non-GET requests
    headers?: Record<string, string>; // Custom headers
    manual?: boolean; // If true, fetch won't start automatically
    dependencies?: any[]; // Dependencies for re-fetching
};

// const BASE_URL = "https://api.example.com"; // Set your base URL here
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';


export function useFetcher<T>(
    endpoint: string,
    options: FetcherOptions = { method: "GET" }
) {
    const [state, setState] = useState<FetcherState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    const fetchData = useCallback(async () => {
        setState({ data: null, error: null, loading: true });

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: options.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(options.headers || {}),
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setState({ data: responseData, error: null, loading: false });
        } catch (error: any) {
            setState({ data: null, error, loading: false });
        }
    }, [endpoint, options]);

    useEffect(() => {
        if (!options.manual) {
            fetchData();
        }
    }, [ ...(options.dependencies || [])]);

    return { ...state, refetch: fetchData };
}
