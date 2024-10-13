
import LiftMontaj from '@/components/dashboard/lift-montaj-amiri/lift-montaj';
import { fetchDataLiftMontaj } from '@/services/liftmontajamri-service';
import { fetchDataPolisaj } from '@/services/polisajamiri-service';


const LiftMontajAmiri = async ({ searchParams }) => {
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
            <LiftMontaj
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
            />
        </>
    );
};

export default LiftMontajAmiri;
