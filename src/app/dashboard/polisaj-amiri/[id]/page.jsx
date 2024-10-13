import React from 'react';
import { getMultipleResponseByOrderId } from '@/services/polisajamiri-service';
import PolisajProduction from '@/components/dashboard/polisaj-amiri/PolisajProduction.jsx';

const PolisajPage = async ({ params }) => {
    if (!params.id) throw new Error('id is required', params.id);

    console.log('params from LiftPage', params);

    const res = await getMultipleResponseByOrderId(params.id); // This returns a Response object

    const order = await res.json();

    console.log('order from LiftPage', order);

    if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');
    return (
        <>
            <PolisajProduction order={order} />
        </>
    );
};

export default PolisajPage;
