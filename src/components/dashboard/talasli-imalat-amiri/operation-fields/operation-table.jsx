import React, { useEffect, useState } from 'react';
import './operation-table.scss';
import EditPopup from './edit-biten-popup.jsx'; // Import the popup component
import { Button } from 'react-bootstrap';
import { swAlert, swConfirm } from '@/helpers/swal';
import { rollBackLastChangeAction } from '@/actions/talasli-actions';

const OperationsInfo = ({ operations, productionProcess }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [operationId, setOperationId] = useState(null);



    const rollBack = async (operation) => {
        setOperationId(operation);
        console.log('Selected Operation:', operation);
        const answer = await swConfirm(
            `En son girilen ${operation.lastCompletedQty} adetlik üretimi geri almak istediğinize emin misiniz??`
        );
        if (!answer.isConfirmed) return;

        const res = await rollBackLastChangeAction(operation.id);

        if (res.success) {
            setTimeout(()=>{
                swAlert(res.message, 'success');}, 1000);
            window.location.reload();
            
        } else {
            swAlert(res.message, 'error');
        }
    };

    return (
        <div className="operations-info">
            <table className="operations-table">
                <thead>
                    <tr>
                        <th>İşlem</th>
                        <th>Biten</th>
                        <th>Kalan</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((operation, index) => (
                        <React.Fragment key={index}>
                            {/* Insert total produced MIL row before BORU_KESME_HAVSA */}
                            {operation.operationType === 'BORU_KESME_HAVSA' && (
                                <tr className="total-row">
                                    <td>Toplam Üretilen Mil</td>
                                    
                                    <td>
                                        {productionProcess.completedQuantity}
                                    
                                    </td>
                                    <td>{productionProcess.remainingQuantity}</td>
                                </tr>
                            )}
                            <tr>
                                <td>{operation.operationType}</td>
                                <td>
                                {}
                                    <Button
                                        className="edit-button"
                                        disabled={operation.completedQuantity === 0 ||operation.lastCompletedQty === 0}
                                        onClick={() =>
                                            rollBack(operation)
                                        }
                                    >
                                        {operation.completedQuantity}
                                    </Button>
                                </td>
                                <td>{operation.remainingQuantity<=0 ?(0) :(operation.remainingQuantity)}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {isPopupOpen && (
                <EditPopup
                    value={newValue}
                    onClose={handleClosePopup}
                    onSave={handleSave}
                    onInputChange={handleInputChange}
                />
            )}
        </div>
    );
};

export default OperationsInfo;
