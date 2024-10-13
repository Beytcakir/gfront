'use client';
import { deleteOrderAction } from '@/actions/order-actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import React from 'react';
import { Button } from 'react-bootstrap';
import { TfiPencil, TfiTrash } from 'react-icons/tfi';

const DeleteOrder = ({ orderNumber }) => {
    const handleDelete = async () => {
        const answer = await swConfirm('Are you sure to delete?');
        if (!answer.isConfirmed) return;

        const res = await deleteOrderAction(orderNumber);
        if (res.ok) {
            swAlert(res.message, 'success');
        } else {
            swAlert(res.message, 'error');
        }
    };

    return (
        <>
            <Button
                className="btn-link bg-danger"
                variant="none"
                onClick={handleDelete}
            >
                <TfiTrash />
            </Button>
        </>
    );
};

export default DeleteOrder;
