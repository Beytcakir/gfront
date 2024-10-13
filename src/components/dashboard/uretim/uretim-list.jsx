'use client';
import DataTable, { Column } from '@/components/common/form-fields/data-table';
import Link from 'next/link';
import React, { useEffect} from 'react';
import { Container } from 'react-bootstrap';
import OrderToolbar from './order-toolbar';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import {
    FaPlus
} from 'react-icons/fa';

const OrderList = ({ data }) => {
    const { content, totalPages, number, size } = data;

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    const handleToolbar = (row) => {
        return <OrderToolbar row={row} />;
    };

    return (
        <>
            <PageHeader>Üretim Planlama</PageHeader>
            <Spacer height={50} />
            <Container>
                <Link
                    href="/dashboard/uretim/new"
                    className="btn btn-primary mb-3"
                >
                    <FaPlus /> Sipariş Oluştur
                </Link>

                <DataTable
                    name="uretimList"
                    title="Sipariş Listesi"
                    dataSource={content}
                    dataKey="id"
                    totalPages={totalPages}
                    currentPage={number}
                    pageSize={size}
                >
                    <Column index={true}>#</Column>
                    <Column dataField="customerName">Müşteri Adı</Column>
                    <Column dataField="gasanNo">Gasan No</Column>
                    <Column dataField="orderNumber">Sipariş No</Column>
                    <Column dataField="orderDate">Sipariş Tarihi</Column>
                    <Column dataField="deliveryDate">Teslim Tarihi</Column>
                    <Column dataField="orderType">Sipariş Türü</Column>
                    <Column dataField="orderQuantity">Sipariş Miktarı</Column>
                    <Column dataField="readyMilCount">Hazir Mil Miktarı</Column>
                    <Column dataField="orderStatus">Sipariş Durumu</Column>

                    <Column template={handleToolbar}></Column>
                </DataTable>
            </Container>
        </>
    );
};

export default OrderList;
