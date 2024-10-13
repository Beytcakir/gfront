import UretimPlanlama from '@/components/dashboard/uretim-planlama/uretim-planlama';
import {getOrders} from '@/services/uretimplanlama-service';
import React from 'react';

const UretimPlanlamaPage = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await getOrders(currentPage, 10, sortBy, sortOrder);
    const data = await res.json();

    if (res.status !== 200) {
        return <div>Error: {res.statusText}</div>;
    }


    return (
        <>
            <UretimPlanlama 
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
             />
        </>
    );
};

export default UretimPlanlamaPage;
