import { getAuthHeader } from '@/helpers/auth-helpers';
const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const getOrders = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
    const response = await fetch(`${API_URL}/orders/getAllOrders?${qs}`, {
        method: 'GET',
        headers: await getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
    }
    return response;
};

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_URL}/orders/createOrder`, {
        method: 'POST',
        headers: {
            ...(await getAuthHeader()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    // if (!response.ok) {
    //     throw new Error(`Error creating order: ${response.statusText}`);
    // }
    return response;
};

export const updateOrder = async (payload) => {
    return fetch(`${API_URL}/orders/updateOrder/${payload.id}`, {
        method: 'put',
        body: JSON.stringify(payload),
        headers: await getAuthHeader()
    });
};

export const deleteOrder = async (orderNumber) => {
    console.log('orderNumber======================', orderNumber);
    const response = await fetch(
        `${API_URL}/orders/deleteOrder/${orderNumber}`,
        {
            method: 'DELETE',
            headers: await getAuthHeader()
        }
    );
    if (!response.ok) {
        throw new Error(`Error deleting order: ${response.statusText}`);
    }
    return response;
};

export const downloadOrders = async (filters = {}) => {
    const qs = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/orders/download/excel?${qs}`, {
        headers: await getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Error downloading orders: ${response.statusText}`);
    }
    return response.blob(); // For downloading the Excel file
};

export const getOrderById = async (id) => {
    const response = await fetch(`${API_URL}/orders/getOrderById/${id}`, {
        method: 'GET',
        headers: await getAuthHeader()
    });

    if (!response.ok) {
        throw new Error(`Error fetching order: ${response.statusText}`);
    }

    return response; // Return the order data as JSON
};

export const updateStatus = async (orderId) => {
    console.log('orderId', orderId);
    const response = await fetch(`${API_URL}/talasli/startStop/${orderId}`, {
        method: 'PUT',
        headers: {
            ...(await getAuthHeader()),
            'Content-Type': 'application/json'
        }
    });
    return response;
}


