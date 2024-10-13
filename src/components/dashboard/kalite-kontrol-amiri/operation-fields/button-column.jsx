import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OperationCol = ({
    stage,
    order,
    togglePopup,
    handleQuantityChange,
    handleSubmit,
    productionQuantity
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
    let txColor = ''; // Default text color
    const bgColor = 'grey';

    const handlePopupClick = () => {
        setIsPopupOpen(true); // Open the popup when "Onayla" button is clicked
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false); // Close the popup
    };

    return (
        <div className="d-flex flex-column">
            <Button
                onClick={handlePopupClick} // Show the popup when this button is clicked
                className="polygon-button first-button"
                style={{ backgroundColor: bgColor, color: txColor }}
            >
                <span>Onayla</span>
            </Button>
            <Button
                className="polygon-button next-button"
                onClick={handlePopupClick}
            >
                <span>Hurda</span>
            </Button>
            <Button
                className="polygon-button next-button"
                onClick={handlePopupClick}
            >
                <span>Mil Taşlamaya Geri Gidecek</span>
            </Button>
            <Button
                className="polygon-button next-button"
                onClick={handlePopupClick}
            >
                <span>Mil Isıl İşleme Geri Gidecek</span>
            </Button>

            {/* Show the popup only if isPopupOpen is true */}
            {isPopupOpen && (
                <div className="popup">
                    <div
                        className="popup-backdrop"
                        onClick={handlePopupClose} // Close the popup when clicking outside
                    ></div>
                    <div className="popup-inner">
                        <h2>Sayisi giriniz!</h2>
                        <input
                            type="number"
                            min={0}
                            value={productionQuantity}
                            onChange={handleQuantityChange}
                        />
                        <div className="popup-button">
                            <button
                                onClick={() =>
                                    handleSubmit(
                                        stage.id,
                                        stage.operationType,
                                        productionQuantity
                                    )
                                }
                                className="inner-button bg-success"
                                disabled={productionQuantity === ''}
                            >
                                Onayla
                            </button>
                            <button
                                onClick={handlePopupClose}
                                className="inner-button"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

OperationCol.propTypes = {
    order: PropTypes.object.isRequired,
    stage: PropTypes.object.isRequired,
    togglePopup: PropTypes.func.isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    productionQuantity: PropTypes.string.isRequired
};

export default OperationCol;
