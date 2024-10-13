import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './edit-biten-popup.scss'; // Import the styles for the popup component

const EditPopup = ({ value, onClose, onSave, onInputChange }) => {
    return (
        <div className="edit-popup">
            <div className="edit-popup-inner">
                <h3>Değeri Düzenle</h3>
                <input
                    type="number"
                    value={value}
                    onChange={onInputChange}
                    min="0"
                    className="edit-input"
                />
                <div className="popup-buttons">
                    <Button className="save-button" onClick={onSave}>
                        Kaydet
                    </Button>
                    <Button className="cancel-button" onClick={onClose}>
                        İptal
                    </Button>
                </div>
            </div>
        </div>
    );
};

EditPopup.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired
};

export default EditPopup;
