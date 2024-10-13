import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataKaliteKontrol = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
        const response = await fetch(
            `${API_URL}/orders/getOrdersForOtherAmir?${qs}`,
            {
                method: 'GET',
                headers: await getAuthHeader()
            }
        );
        console.log('RESPONSE STATUS:', response.status);
        return response;
};

export const getMultipleResponses = async (orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/getAllForOrder/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const getOrderAndStage = async (orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/getOrderAndStage/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};
