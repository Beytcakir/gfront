import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataPolisaj = async (
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

export const getMultipleResponseByOrderId = async (orderId) => {
    const response = await fetch(
        `${API_URL}/orders/getMultipleResponseByIdForPolisaj/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updatePolisaj = async (payload, orderId) => {
    const response = await fetch(`${API_URL}/polisaj/${orderId}`, {
        method: 'PUT',
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
    return response;
};

export const rollBackLastChange = async (operationId) => {
    console.log('operationId from rollBackLastChange:', operationId);
    const response = await fetch(
        `${API_URL}/polisaj/removeLastChange/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    return response;
};