import axios from 'axios';

// Perform a GET request to the provided URL with optional signal for aborting
export async function handleFetch(url, signal) {
    try {
        const response = await axios.get(url, { signal });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Perform a GET request with URL and query parameters, with optional signal for aborting
export async function fetchWithParams(url, params, signal) {
    try {
        const response = await axios.get(url, { params, signal });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
