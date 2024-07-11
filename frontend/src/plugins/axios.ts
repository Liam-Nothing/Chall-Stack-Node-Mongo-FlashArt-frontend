import axios from 'axios';
import { useRouter } from 'vue-router';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-type': 'application/json',
    },
});

// Add a request interceptor to add the token to headers
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle invalid token
apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            const router = useRouter();
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
