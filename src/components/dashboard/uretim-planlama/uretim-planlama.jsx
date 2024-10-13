'use client';

import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Modal,
    Form,
    Table,
    Pagination
} from 'react-bootstrap';
import PageHeader from '@/components/common/page-header';
import {
    FaDownload,
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes
} from 'react-icons/fa';
import styles from './uretim.css';
import CreateOrder from './order-helper/order-form';
import OrderDelete from './order-helper/delete-order';

const UretimPlanlama = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, totalPages } = data;
    const getRowClass = (orderStatus) => {
        switch (orderStatus) {
            case 'Tamamlandı':
                return styles.rowGreen;
            case 'İptal Edildi':
                return styles.rowRed;
            case 'İşlenmekte':
                return styles.rowYellow;
            case 'İşlenmeyi Bekliyor':
                return styles.rowBlue;
            default:
                return styles.rowWhite;
        }
    };
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [editOrderData, setEditOrderData] = useState(null);

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
        url.searchParams.delete('currentPage'); // Optional: reset to first page
        window.location.href = url.toString();
    };

    const handlePageChange = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', page);
        window.location.href = url.toString();
    };

    const handleOrderSuccess = () => {
        setShowOrderForm(false);
        //window.location.reload(); // Reload page to reflect the changes after order creation
    };

    return (
        <>
            <div className="ms-3 me-3 ">
                <PageHeader>Ürün Planlama </PageHeader>
                <div className="buttons">
                    <div className="btn downlod">
                        <Button variant="secondary">
                            <FaDownload /> Sipariş Listesi İndir
                        </Button>
                    </div>
                    <div className="btn create">
                        <Button
                            type="submit"
                            onClick={() => setShowOrderForm(true)}
                        >
                            <FaPlus /> Sipariş Oluştur
                        </Button>
                    </div>
                </div>
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
                                        Sırala Tarihi
                                    </option>
                                    <option value="deliveryDate">
                                        Teslim Tarihi
                                    </option>
                                    <option value="orderNumber">
                                        Sipariş Numarası
                                    </option>
                                    <option value="customerName">
                                        Müşteri Adı
                                    </option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="sortOrder">
                                <Form.Label>Sipariş Sırala</Form.Label>
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
                                Sıfırla
                            </Button>
                        </Col>
                    </div>
                </Row>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr className="table border-success">
                                <th></th>
                                <th>Müşter Adı</th>
                                <th>Gasan No</th>
                                <th>Sipariş No</th>
                                <th>Sipariş Tarihi</th>
                                <th>Teslim Tarihi</th>
                                <th>Sipariş Türü</th>
                                <th>Sipariş Adedi</th>
                                <th>Sipariş Durumu</th>
                                <th>Hazır Mil Adedi</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`eachRow border-success ${getRowClass(
                                        order.orderStatus
                                    )}`}
                                >
                                    <td>
                                        {order.orderStatus === 'Tamamlandı' ? (
                                            <FaCheck color="green" />
                                        ) : (
                                            <FaTimes color="red" />
                                        )}
                                    </td>
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
                                            'İşlenmeyi Bekliyor' ||
                                        order.orderStatus == 'İşlenmekte' ? (
                                            <Button
                                                variant="warning"
                                                onClick={() =>
                                                    onEdit(order.orderNumber)
                                                }
                                            >
                                                <FaEdit />
                                            </Button>
                                        ) : null}
                                    </td>
                                    <td>
                                        {(order.orderStatus ===
                                            'İptal Edildi' ||
                                            order.orderStatus ===
                                                'İşlenmeyi Bekliyor' ||
                                            order.orderStatus == 'İşlenmekte') &
                                        (order.orderStatus !== 'Tamamlandi') ? (
                                            <OrderDelete
                                                orderNumber={order.orderNumber}
                                            />
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

                <Modal
                    show={showOrderForm}
                    onHide={() => setShowOrderForm(false)}
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <CreateOrder onSuccess={handleOrderSuccess} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default UretimPlanlama;
