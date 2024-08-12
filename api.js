import axios from 'axios';

const API_URL = 'https://example.com/api';

const registerUser = async (name, email, phone, password, confirmPassword) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            phone,
            password,
            confirmPassword,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const payBill = async (billAmount) => {
    try {
        const response = await axios.post(`${API_URL}/pay-bill`, {
            billAmount,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getRewardPoints = async () => {
    try {
        const response = await axios.get(`${API_URL}/reward-points`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getTravelInsurance = async () => {
    try {
        const response = await axios.get(`${API_URL}/travel-insurance`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getRealTimeCurrencyConversion = async () => {
    try {
        const response = await axios.get(`${API_URL}/real-time-currency-conversion`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { registerUser, getTransactions, payBill, getRewardPoints, getTravelInsurance, getRealTimeCurrencyConversion };
