import BlockLift from '@/components/dashboard/bloklift-montaj-amiri/bloklift';
import BlokLiftPage from '@/components/dashboard/bloklift-montaj-amiri/bloklift';
import { fetchDataLiftMontaj } from '@/services/liftmontajamri-service';
import React from 'react';

const BLokLiftAmiri =async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataLiftMontaj(currentPage, 10, sortBy, sortOrder);

    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Error: {res.statusText}</div>;
    }
    
    return (
        <>
            <BlockLift 
             data={data}
             currentPage={currentPage}
             sortBy={sortBy}
             sortOrder={sortOrder}
            />
        </>
    );
};

export default BLokLiftAmiri;
