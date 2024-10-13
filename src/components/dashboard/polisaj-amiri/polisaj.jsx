'use client';

import React from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Form,
    Button
} from 'react-bootstrap';
import PageHeader from '@/components/common/page-header';
import './polisaj.scss';
import { useRouter } from 'next/navigation';


const Polisaj = ({ data, currentPage, sortBy, sortOrder }) => {
    const router = useRouter();
    const { content, totalPages } = data;


    const handleRowClick = (order) => {
            router.push(`/dashboard/polisaj-amiri/${order.id}`); 
    };

    const handleSortChange = (e) => {
        const { name, value } = e.target;
        const url = new URL(window.location);
        if (name === 'sortBy') {
            url.searchParams.set('sortBy', value);
        } else if (name === 'sortOrder') {
            url.searchParams.set('sortOrder', value);
        }
        window.location.href = url.toString();
    };

    // Handle reset
    const handleReset = () => {
        const url = new URL(window.location);
        url.searchParams.set('sortBy', 'orderDate');
        url.searchParams.set('sortOrder', 'desc');
        url.searchParams.delete('currentPage'); 
        window.location.href = url.toString();
    };

    // Handle page change
    const handlePageChange = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', page);
        window.location.href = url.toString();
    };

    return (
        <>
            <PageHeader>Polisaj Amiri </PageHeader>
            <Container>
                <Row className="my-3">
                    <div className="d-flex gap-3">
                        <Col md={2}>
                            <Form.Group controlId="sortBy">
                                <Form.Label>Sırala</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sortBy"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                >
                                    <option value="orderDate">
                                        Sipariş Tarihi
                                    </option>
                                    <option value="deliveryDate">
                                        Teslim Tarihi
                                    </option>
                                    <option value="orderNumber">
                                        Sipaş No
                                    </option>
                                    <option value="customerName">
                                        Müşteri Adı
                                    </option>
                                
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="sortOrder">
                                <Form.Label>Siparişi Sırala</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sortOrder"
                                    value={sortOrder}
                                    onChange={handleSortChange}
                                >
                                    <option value="asc">Artan</option>
                                    <option value="desc">Azalan</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Button
                                className="p-1"
                                variant="secondary"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </Col>
                    </div>
                </Row>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Müşter Adı</th>
                                <th>Gasan No</th>
                                <th>Sipariş No</th>
                                <th>Sipariş Tarihi</th>
                                <th>Teslim Tarihi</th>
                                <th>Sipariş Türü</th>
                                <th>Sipariş Adedi</th>
                                <th>Sipariş Durumu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((order, index) => (
                                <tr key={index} 
                                    className="eachRow"
                                    onClick={() => handleRowClick(order)}
                                    >
                                    <td>{order.customerName}</td>
                                    <td>{order.gasanNo}</td>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.orderStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Pagination>
                    {[...Array(totalPages).keys()].map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </>
    );
};

export default Polisaj;
