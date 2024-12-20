import { jwtDecode } from 'jwt-decode';

const decodedJWT = () => {
    const token = localStorage.getItem('token');

    // Check if the token is valid
    if (!token || typeof token !== 'string') {
        console.error('Invalid or missing token:', token);
        return null; // Return null or handle this case as needed
    }

    try {
        // Decode token
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null or handle the error case
    }
};

export default decodedJWT;
