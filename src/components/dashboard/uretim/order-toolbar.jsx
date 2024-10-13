'use client';
import { deleteOrderAction } from '@/actions/order-actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TfiPencil, TfiTrash } from 'react-icons/tfi';

const OrderToolbar = ({ row }) => {
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {

        return () => {
            console.log('cleanup');
        }
        
    }, [row]);

    const handleDelete = async () => {
        const answer = await swConfirm(`${row.orderNumber} numaralı siparişi silmek istediğinize emin misiniz?`);
        if (!answer.isConfirmed) return;
        console.log('row.id', row.id);

        const res = await deleteOrderAction(row.orderNumber);
        
        if (res.success) {
            window.location.reload();
            swAlert(res.message, 'success');
        } else {
            swAlert(res.message, 'error');
        }
    };

    return (
        <>
            <Button
                as={Link}
                
                variant="warning"
                className="btn-link text-info"
                href={`/dashboard/uretim/${row.id}`}
            >
                <TfiPencil />
            </Button>

            <Button className="btn-link" variant="danger" onClick={handleDelete}>
                <TfiTrash />
            </Button>
        </>
    );
};

export default OrderToolbar;
