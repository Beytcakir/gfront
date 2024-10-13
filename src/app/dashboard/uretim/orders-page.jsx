'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderFormModal from '@/components/dashboard/uretim/order-form';
import OrderEditModal from '@/components/dashboard/uretim/order-edit';

const OrdersPage = ({ children }) => {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showOrderEdit, setShowOrderEdit] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Detect path and open the corresponding modal
        const handleRouteChange = (url) => {
            if (url.includes('/dashboard/uretim/new')) {
                setShowOrderForm(true);
                setShowOrderEdit(false);
            } else if (url.includes('/dashboard/uretim/')) {
                const id = url.split('/').pop();
                if (!isNaN(id)) {
                    setCurrentOrderId(id);
                    setShowOrderForm(false);
                    setShowOrderEdit(true);
                }
            } else {
                setShowOrderForm(false);
                setShowOrderEdit(false);
            }
        };

        // Listen to route changes
        router.events.on('routeChangeComplete', handleRouteChange);

        // Clean up the listener when the component unmounts
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            {children}

            {/* Order Form Modal */}
            <OrderFormModal
                show={showOrderForm}
                onHide={() => {
                    setShowOrderForm(false);
                    router.push('/dashboard/uretim'); // Close the modal and navigate back
                }}
            />

            {/* Order Edit Modal */}
            {currentOrderId && (
                <OrderEditModal
                    show={showOrderEdit}
                    onHide={() => {
                        setShowOrderEdit(false);
                        router.push('/dashboard/uretim'); // Close the modal and navigate back
                    }}
                    orderId={currentOrderId}
                />
            )}
        </>
    );
};

export default OrdersPage;
