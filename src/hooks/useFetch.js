import React from 'react';
import api from '../singleton/api';

const useFetch = (url, options) => {
    const [ response, setResponse ] = React.useState(null);
    const [ error, setError ] = React.useState(null);
    const [ loading, setLoading ] = React.useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.apiClient.get(url, options);

            setResponse(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return { response, error, loading, fetchData };
};

export default useFetch;
