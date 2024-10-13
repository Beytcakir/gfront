import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Form,
    Button,
    BookMark
} from 'react-bootstrap';
import './operation-button.scss';
import ButtonColumn from './button-column';
import OperationsInfo from './operation-table';
import {
    milKoparmaAction,
    milTornalamaAction,
    milTaslamaAction,
    isilIslemAction,
    boruKesmeAction,
    ezmeAction
} from '@/actions/talasli-actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import { response } from '@/helpers/form-validation';

const OperationButton = ({order,  stage}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');
    const operationOrder = [
        'MIL_KOPARMA',
        'MIL_TORNALAMA',
        'MIL_TASLAMA',
        'ISIL_ISLEM',
        'EZME',
        'BORU_KESME_HAVSA'
    ];


    // const togglePopup = (operationId) => {
    //     setIsPopupOpen((prev) => (prev === operationId ? null : operationId)); // **Highlight: Toggle between null and the specific operationId**
    // };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value > 0) {
            setProductionQuantity(value);
        } else {
            setProductionQuantity('');
        }
    };

    const handleSubmit = async (operationId, operationType, producedAmount) => {
    
        try {
            // Construct the payload
            const formData = new FormData();

            // Append the fields to the FormData object

            formData.append('operationType', operationType);
            formData.append('completedQuantity', parseInt(producedAmount, 10));

            // Declare response variable
            let response;

            if (response.success) {
                swAlert(response.message);
                setTimeout(() => {   
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            swAlert(error.message, 'error');
        } finally {
            togglePopup();
            setProductionQuantity('');
        }
    };

    
    return (
        <>
            <Container className="d-flex gap-5 justify-content-center operation_button ">
                <Row className="d-inline-block gap-5">
                    
                            
                                <Col className="d-flex gap-1">
                                    <div>
                                        <ButtonColumn
                                            order={order}
                                            stage={stage}
                                            isPopupOpen={isPopupOpen}
                                            handleQuantityChange={
                                                handleQuantityChange
                                            }
                                            handleSubmit={handleSubmit}
                                            productionQuantity={
                                                productionQuantity
                                            }
                                        />
                                    </div>
                                </Col>
                            
                </Row>
                <Row className="d-flex flex-column m-0">
                    <Col>
                        <OperationsInfo
                            stage={stage}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default OperationButton;
