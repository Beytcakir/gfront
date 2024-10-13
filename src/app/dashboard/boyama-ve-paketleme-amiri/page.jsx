import BoyaPaketPage from '@/components/dashboard/boyama-ve-paketleme-amiri/boya-paket';
import { fetchDataBoyama } from '@/services/boyapaketlemeamiri-service';
import React from 'react';

const BoyaPaketAmiri = async({ searchParams }) => {

    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataBoyama(currentPage, 10, sortBy, sortOrder);

    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Error: {res.statusText}</div>;
    }
    return (
        <>
            <BoyaPaketPage
              data={data}
              currentPage={currentPage}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
        </>
    );
};

export default BoyaPaketAmiri;
