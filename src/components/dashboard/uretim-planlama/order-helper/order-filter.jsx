// src/components/orders/OrderFilter.jsx
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const OrderFilter = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Sipariş Durumu</Form.Label>
                        <Form.Control
                            as="select"
                            name="orderStatus"
                            value={filters.orderStatus || ''}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="Completed">Tamamlandı</option>
                            <option value="In Progress">Üretimde</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Müşteri Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="customerName"
                            value={filters.customerName || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Sipariş Türü</Form.Label>
                        <Form.Control
                            type="text"
                            name="orderType"
                            value={filters.orderType || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Sipariş Tarihi</Form.Label>
                        <Form.Control
                            type="date"
                            name="createDate"
                            value={filters.createDate || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" onClick={() => setFilters({})}>
                Filtreyi Sıfırla
            </Button>
        </Form>
    );
};

export default OrderFilter;
