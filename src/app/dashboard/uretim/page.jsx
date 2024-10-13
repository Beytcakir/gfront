import OrderList from "@/components/dashboard/uretim/uretim-list";
import { getOrders } from "@/services/uretimplanlama-service";
import React from "react";

const UretimPage = async ({searchParams}) => {
    const { page } = searchParams;

    const res = await getOrders(page);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return (
        <>
            <OrderList data={data} />
        </>
    );
};

export default UretimPage;