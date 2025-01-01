import { useState, useCallback } from "react";
import { axiosPrivate } from "../customAxios/authAxios"; // Import only axiosPrivate

const useApi = () => {
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [apiData, setApiData] = useState(null);

    const sendRequest = useCallback(async (config) => {
        setIsApiLoading(true);
        setApiError(null); // Clear any previous errors

        try {
            const response = await axiosPrivate({
                method: config.method || "GET",  // Default to GET if method is not provided
                url: config.url,
                data: config.data,
                headers: config.headers,
                params: config.params
            });
            console.log("res: ", response);
            setApiData(response.data);
            return response.data; // Optional: return data for immediate use
        } catch (err) {
            setApiError(err?.response?.data?.message || "An error occurred");
        } finally {
            setIsApiLoading(false);
        }
    }, []); // `useCallback` ensures that the function reference remains stable

    return { sendRequest, isApiLoading, apiError, apiData };
};

export default useApi;
