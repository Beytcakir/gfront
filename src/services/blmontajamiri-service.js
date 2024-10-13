import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataMontaj = async (
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