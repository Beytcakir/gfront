import OrderEdit from "@/components/dashboard/uretim/order-edit";
import { getOrderById } from "@/services/uretimplanlama-service";
import React from "react";

const OrderEditPage = async ({params}) => {
    if (!params.id) throw new Error("id is required" ,params.id);

    const res = await getOrderById(params.id); // This returns a Response object
    console.log('res from OrderEditPage', res);

    const order = await res.json();

    if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');

    return (
        <>
            <OrderEdit order={order} />
        </>
    );
};

export default OrderEditPage;