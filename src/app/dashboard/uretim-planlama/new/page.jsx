import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderCreateForm from '@/components/dashboard/uretim-planlama/order-helper/order-form';
import React from 'react';

const OrderCreatePage = () => {
    return (
        <>
            <PageHeader>Yeni Siparis</PageHeader>
            <Spacer height={70} />
            <OrderCreateForm />
            <Spacer />
        </>
    );
};

export default OrderCreatePage;
