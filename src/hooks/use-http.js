import { useState } from "react";

const useHttp = (requestConfig,applyData) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);
        try {
        const response = await fetch(
           requestConfig.url,{
            method:requestConfig.method,
            headers:requestConfig.headers,
            body:JSON.stringify(requestConfig.body)
           }
        );

        if (!response.ok) {
            throw new Error('Request failed!');
        }

        const data = await response.json();

        // This applyData is a function from the component where useHttp is called which does
        // further data transformation on its side once we fetch the data from post or get 
        applyData(data)
        } catch (err) {
        setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };
    return {
        isLoading:isLoading,
        error:error,
        sendRequest:sendRequest
    }
}

export default useHttp;