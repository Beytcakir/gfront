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

const OperationButton = ({order, operations, productionProcess}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');
    const operationOrder = [
        'MIL_KOPARMA',
        'MIL_TORNALAMA',
        'MIL_TASLAMA',
        'ISIL_ISLEM',
        'EZME',
        'BORU_KESME_HAVSA'
    ];

    useEffect(() => {
        console.log('Operations:', operations);
    }, [operations]);

    const compareOperations = (a, b) => {
        return (
            operationOrder.indexOf(a.operationType) -
            operationOrder.indexOf(b.operationType)
        );
    };

    // Sort the operations array
    const sortedOperations = operations.sort(compareOperations);

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
            let response;

            // Determine which action to call based on operation type
            switch (operationType) {
                case 'BORU_KESME_HAVSA':
                    response = await boruKesmeAction(formData, operationId);
                    break;
                case 'MIL_KOPARMA':
                    response = await milKoparmaAction(formData, operationId);
                    break;
                case 'MIL_TORNALAMA':
                    response = await milTornalamaAction(formData, operationId);
                    break;
                case 'MIL_TASLAMA':
                    response = await milTaslamaAction(formData, operationId);
                    break;
                case 'ISIL_ISLEM':
                    response = await isilIslemAction(formData, operationId);
                    break;
                case 'EZME':
                    response = await ezmeAction(formData, operationId);
                    break;
                default:
                    throw new Error(`Unknown operation type: ${operationType}`);
            }

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
                <Row className="d-inline-block gap-5">
                    {Array.isArray(sortedOperations) &&
                    sortedOperations.length > 0 ? (
                        sortedOperations
                            .filter(
                                (operation) =>
                                    operation.operationType !==
                                    'BORU_KESME_HAVSA'
                            )
                            .map((operation, index) => (
                                <Col key={index} className="d-flex gap-1">
                                    <div>
                                        <ButtonColumn
                                            order={order}
                                            operation={operation}
                                            list={sortedOperations}
                                            index={index}
                                            togglePopup={togglePopup}
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
                            ))
                    ) : (
                        <p>No operations available</p>
                    )}
                </Row>
                <Row className="d-flex flex-column m-0">
                    <Col>
                        {sortedOperations
                            .filter(
                                (operation) =>
                                    operation.operationType ===
                                    'BORU_KESME_HAVSA'
                            )
                            .map((operation, index) => (
                                <ButtonColumn
                                    key={index}
                                    operation={operation}
                                    order={order}
                                    index={index}
                                    togglePopup={togglePopup}
                                    isPopupOpen={isPopupOpen}
                                    handleQuantityChange={handleQuantityChange}
                                    handleSubmit={handleSubmit}
                                    productionQuantity={productionQuantity}
                                    list={sortedOperations}
                                />
                            ))}
                    </Col>
                    <Col>
                        <OperationsInfo
                            operations={sortedOperations}
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
