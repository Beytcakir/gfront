import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './operation-button.scss';
import ButtonColumn from './button-column';
import OperationsInfo from './operation-table';
import {
    polisajAction
} from '@/actions/polisaj-actions';
import { swAlert, swConfirm } from '@/helpers/swal';

const OperationButton = ({order, operation, productionProcess}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');
    
    useEffect(() => {
        console.log('Operations:', operation);
    }, [operation]);


    

    const togglePopup = (operationId) => {
        setIsPopupOpen((prev) => (prev === operationId ? null : operationId)); // **Highlight: Toggle between null and the specific operationId**
    };

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

            formData.append('productionProcessId', productionProcess.id);
            formData.append('operationType', operationType);
            formData.append('completedQuantity', parseInt(producedAmount, 10));

            // Declare response variable
            const response = await polisajAction(formData, operationId); 

            console.log('Response:', response);

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
                
                <Row className="d-flex flex-column m-0">
                    <Col>
                        
                                <ButtonColumn
                                    operation={operation}
                                    order={order}
                                    togglePopup={togglePopup}
                                    isPopupOpen={isPopupOpen}
                                    handleQuantityChange={handleQuantityChange}
                                    handleSubmit={handleSubmit}
                                    productionQuantity={productionQuantity}
                                />
                    </Col>
                    <Col>
                        <OperationsInfo
                            operation={operation}
                            productionProcess={productionProcess}
                            order={order}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default OperationButton;
