import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchOrders = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
        const response = await fetch(
            `${API_URL}/orders/getAllOrdersForSupervisor?${qs}`,
            {
                method: 'GET',
                headers: await getAuthHeader()
            }
        );
        console.log('RESPONSE STATUS:', response.status);
        return response;
};

export const fetchOrderById = async (orderId) => {
    const response = await fetch(
        `${API_URL}/orders/getMultipleResponseById/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
}

export const updateMilKoparma = async (payload, orderId) => {
    
    const response = await fetch(
        `${API_URL}/talasli/milkoparma/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
}

export const updateMilTornalama = async (payload, operationId) => {
    const response = await fetch(`${API_URL}/talasli/miltornalama/${operationId}`, {
        method: 'PUT',
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
    return response;
};

export const updateMilTaslama = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/talasli/miltaslama/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateisilIslem = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/talasli/isilislem/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateboruKesme = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/talasli/borukesme/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateEzme = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/talasli/ezme/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollBackLastChange = async ( operationId) => {
    console.log('operationId from rollBackLastChange:', operationId);
    const response = await fetch(
        `${API_URL}/talasli/removelastchange/${operationId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};
