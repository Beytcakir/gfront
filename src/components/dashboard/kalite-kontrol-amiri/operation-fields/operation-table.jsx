import React, { useEffect, useState } from 'react';
import './operation-table.scss';
import EditPopup from './edit-biten-popup.jsx'; // Import the popup component
import { Button } from 'react-bootstrap';
import { swAlert, swConfirm } from '@/helpers/swal';
import { rollBackLastChangeAction } from '@/actions/talasli-actions';

const OperationsInfo = ({stage}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [operationId, setOperationId] = useState(null);



    const rollBack = async (stage) => {
        setOperationId(stage);
        console.log('Selected Operation:', stage);
        const answer = await swConfirm(
            `En son girilen ${stage.lastApprove} adetlik üretimi geri almak istediğinize emin misiniz??`
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
                    <React.Fragment>
                        <tr>
                            <td>Onay Aşaması</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    disabled={
                                        stage.approveCount === 0 ||
                                        stage.lastApproveCount === 0
                                    }
                                    onClick={() => rollBack(stage)}
                                >
                                    {stage.approveCount}
                                </Button>
                            </td>
                            <td>{stage.milCount <= 0 ? 0 : stage.milCount}</td>
                        </tr>
                        <tr>
                            <td>Hurda</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    disabled={stage.lastApproveCount === 0}
                                    onClick={() => rollBack(stage)}
                                >
                                    {stage.scrapCount}
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Mil Taşlama</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    disabled={stage.lastReturnedToMilTaslama === 0}
                                    onClick={() => rollBack(stage)}
                                >
                                    {stage.returnedToMilTaslama}
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Isıl İşlem</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    disabled={stage.lastApproveCount === 0}
                                    onClick={() => rollBack(stage)}
                                >
                                    {stage.scrapCount}
                                </Button>
                            </td>
                        </tr>
                    </React.Fragment>
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
