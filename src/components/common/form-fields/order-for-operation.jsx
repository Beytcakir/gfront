import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap';
import React from 'react';
import './order-for-operation.scss'

const OrderForOperation = ({ order }) => {
    return (
        <>
            <Container className="table-container">
                <div className="table-wrapper">
                    {/* Table Header */}
                    <div className="table-head">
                        <Table className="container-head table table-bordered text-center border-0">
                            <thead>
                                <tr className="inner-head">
                                    <th className="inner-box head-box">
                                        Müşter Adı
                                    </th>
                                    <th className="inner-box head-box">
                                        Gasan No
                                    </th>
                                    <th className="inner-box head-box">
                                        Teslim Tarihi
                                    </th>
                                    <th className="inner-box head-box">
                                        Sipariş Türü
                                    </th>
                                    <th className="inner-box head-box">
                                        Sipariş Adedi
                                    </th>
                                    <th className="inner-box head-box">
                                        Sipariş Durumu
                                    </th>
                                    {order.orderType === 'LIFT' ? (
                                        <th className="inner-box head-box">
                                            Hazır Mil Adedi
                                        </th>
                                    ) : null}
                                </tr>
                            </thead>
                        </Table>
                    </div>
                    {/* Table Body */}
                    <div className="table-body">
                        <Table className="table table-bordered text-center border-0">
                            <tbody>
                                <tr className="inner-body">
                                    <th className="inner-box">
                                        {order.customerName}
                                    </th>
                                    <th className="inner-box">
                                        {order.gasanNo}
                                    </th>
                                    <th className="inner-box">
                                        {order.deliveryDate}
                                    </th>
                                    <th className="inner-box">
                                        {order.orderType}
                                    </th>
                                    <th className="inner-box">
                                        {order.orderQuantity}
                                    </th>
                                    <th className="inner-box">
                                        {order.orderStatus}
                                    </th>
                                    {order.orderType === 'LIFT' ? (
                                        <th className="inner-box">
                                            {order.readyMilCount}
                                        </th>
                                    ) : null}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OrderForOperation;
