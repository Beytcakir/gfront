'use client';

import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation'; // Use Next.js router for redirection
import { updateOrderStatus } from '@/actions/order-actions'; // External function for API call
import './talasli.scss';

const Order = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, totalPages } = data;
    const [orders, setOrders] = useState(content); // State to hold orders
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false); // To track if an order is "İşlenmekte"

    // Check if any order has the status 'İşlenmekte'
    useEffect(() => {
        const processingOrder = orders.find(
            (order) => order.orderStatus === 'İşlenmekte'
        );
        setIsProcessing(!!processingOrder); // Set to true if any order is being processed
    }, [orders]);

    // Handle order status change (start or stop processing an order)
    const handleStatusChange = async (order, newStatus) => {
        
        try {
            
            const response = await updateOrderStatus(order.id, newStatus); // Call external function

            console.log('response', response);
            
            
            if (response.success) {
                
                // Reload the page to reflect the new status after 2 seconds
                
                    window.location.reload();
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Redirect the user based on orderType when the row is clicked
    const handleRowClick = (order) => {
        
        
        
            router.push(`/dashboard/talasli-imalat-amiri/lift/${order.id}`); // Use Next.js router for redirection
        
    };

    // Handle sorting change (set sortBy and sortOrder in the URL)
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

    // Handle sorting reset (Reset button functionality)
    const handleReset = () => {
        const url = new URL(window.location);
        url.searchParams.delete('sortBy');
        url.searchParams.delete('sortOrder');
        url.searchParams.delete('currentPage'); // Reset to the first page
        window.location.href = url.toString(); // Reload with cleared params
    };

    return (
        <>
            <PageHeader>Talasli Imalat Amiri</PageHeader>
            <Container fluid className=''>
                <Row className="my-3 ">
                    <div className="d-flex gap-3">
                        {/* Sorting controls */}
                        <Col md={2}>
                            <Form.Group controlId="sortBy">
                                <Form.Label>Sırala</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sortBy"
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e)}
                                >
                                    <option value="orderDate">
                                        Sipariş Tarihi
                                    </option>
                                    <option value="deliveryDate">
                                        Teslim Tarihi
                                    </option>
                                    <option value="orderNumber">
                                        Sipariş No
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
                                    onChange={(e) => handleSortChange(e)}
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
                                onClick={handleReset} // Reset sorting and pagination
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
                                <th>Siparis No</th>
                                <th>Müşter Adı</th>
                                <th>Gasan No</th>
                                <th>Sipariş No</th>
                                <th>Sipariş Tarihi</th>
                                <th>Teslim Tarihi</th>
                                <th>Sipariş Türü</th>
                                <th>Sipariş Adedi</th>
                                <th>Sipariş Durumu</th>
                                <th>Hazır Mil Adedi</th>
                                <th>Başla/Durdur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="eachRow"
                                    onClick={() =>
                                        order.orderStatus === 'İşlenmekte'
                                            ? handleRowClick(order)
                                            : null
                                    } // Make the row clickable only if the status is 'İşlenmekte'
                                    style={{
                                        cursor:
                                            order.orderStatus === 'İşlenmekte'
                                                ? 'pointer'
                                                : 'default'
                                    }} // Change cursor style for clickable rows
                                >
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.gasanNo}</td>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.readyMilCount}</td>
                                    <td>
                                        {order.orderStatus ===
                                        'İşlenmeyi Bekliyor' ? (
                                            <Button
                                                variant="primary"
                                                //disabled={isProcessing} // Disable if another order is in progress
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(
                                                        order,
                                                        'İşlenmekte'
                                                    );
                                                }}
                                            >
                                                Basla
                                            </Button>
                                        ) : order.orderStatus ===
                                          'İşlenmekte' ? (
                                            <Button
                                                variant="danger"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(
                                                        order,
                                                        'Beklemede'
                                                    );
                                                }}
                                            >
                                                Durdur
                                            </Button>
                                        ) : order.orderStatus ===
                                          'Beklemede' ? (
                                            <Button
                                                variant="success"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(
                                                        order,
                                                        'İşlenmekte'
                                                    );
                                                }}
                                            >
                                                Tekrar Baslat
                                            </Button>
                                        ) : null}
                                    </td>
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

export default Order;
