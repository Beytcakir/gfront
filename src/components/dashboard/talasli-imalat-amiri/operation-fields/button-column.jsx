import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
const operationsThatDisable = [
    'MIL_TORNALAMA',
    'MIL_TASLAMA',
    'ISIL_ISLEM',
    'EZME'
];

const OperationCol = ({
    operation,
    order,
    index,
    togglePopup,
    isPopupOpen,
    handleQuantityChange,
    handleSubmit,
    productionQuantity
}) => {
    let txColor = ''; // Default text color
    const bgColor =
        operation.operationType === 'BORU_KESME_HAVSA'
            ? (operation.completedQuantity === 0 &&
              operation.remainingQuantity === 0
                ? (() => {
                      txColor = 'white'; // Set text txColor to gray
                      return 'rgb(158, 156, 156)'; // Background txColor for this condition
                  })()
                : operation.completedQuantity >= order.orderQuantity &&
                  operation.remainingQuantity <= 0
                ? (() => {
                      txColor = 'white'; // Set text txColor to white for fully completed
                      return 'green'; // Background txColor for fully completed
                  })()
                : operation.remainingQuantity > 0
                ? (() => {
                      txColor = 'black'; // Set text txColor to black for partially completed
                      return 'yellow'; // Background txColor for partially completed
                  })()
                : 'rgb(158, 156, 156)' // Default background color
            )
            : 
            (operation.completedQuantity === 0 &&
              operation.remainingQuantity === 0
            ? (() => {
                  txColor = 'white'; // Set text txColor to gray
                  return 'rgb(158, 156, 156)'; // Background txColor for this condition
              })()
            : operation.completedQuantity >=
                  (order.orderQuantity - order.readyMilCount) &&
              (operation.remainingQuantity) <= 0
            ? (() => {
                  txColor = 'white'; // Set text txColor to white for fully completed
                  return 'green'; // Background txColor for fully completed
              })()
            : operation.remainingQuantity > 0
            ? (() => {
                  txColor = 'black'; // Set text txColor to black for partially completed
                  return 'yellow'; // Background txColor for partially completed
              })()
            : 'rgb(158, 156, 156)' // Default background color)
            )
        


    return (
        <div>
            <Button
                onClick={() => togglePopup(operation.id)} // **Highlight: Pass the specific operation ID to togglePopup**
                className={`polygon-button index-${index}`}
                style={{ backgroundColor: bgColor, color: txColor }}
                 disabled={operation.remainingQuantity === 0 && operationsThatDisable.includes(operation.operationType)}
                data-operation-type={operation.operationType}
                //disabled={handleNextOperationButton()}
            >
                <span>{operation.operationType}</span>
            </Button>
            {isPopupOpen === operation.id && ( // **Highlight: Ensure the popup is open only for the specific operation**
                <div className="popup">
                    <div
                        className="popup-backdrop"
                        onClick={() => togglePopup(null)}
                    ></div>
                    <div className="popup-inner">
                        <h2>Üretilen Adedi Giriniz</h2>
                        <input
                            type="number"
                            min={0}
                            value={productionQuantity}
                            onChange={handleQuantityChange}
                        />
                        <div className="popup-button">
                            <button
                                onClick={() =>
                                    // Log entire operation object
                                    handleSubmit(
                                        operation.id,
                                        operation.operationType,
                                        productionQuantity
                                    )
                                }
                                className="inner-button bg-success"
                                disabled={productionQuantity === ''}
                            >
                                Onayla
                            </button>
                            <button
                                onClick={togglePopup}
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
    operation: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    togglePopup: PropTypes.func.isRequired,
    isPopupOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
        .isRequired, // **Highlight: Changed prop type to handle operation ID**
    handleQuantityChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    productionQuantity: PropTypes.string.isRequired
};

export default OperationCol;
