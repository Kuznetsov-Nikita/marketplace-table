import React, { useState, useEffect } from "react";
import './ActiveFieldsChoiceModal.css';

function ActiveFieldsChoiceModal({
    isOpen, 
    onClose, 
    fields, 
    selectedFields, 
    onSelectionChange
}) {
    const [currentSelectedFields, setCurrentSelectedFields] = 
        useState(selectedFields.map((field) => field.name));
    useEffect(
        () => {
            setCurrentSelectedFields(selectedFields.map((field) => field.name))
        }, 
        [selectedFields]
    );

    const onCurrentSelectionChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
            setCurrentSelectedFields([...currentSelectedFields, value]);
        } else {
            setCurrentSelectedFields(
                currentSelectedFields.filter((field) => field !== value)
            );
        }
    };
    
    const onSaveButtonClick = () => {
        onSelectionChange(fields.filter(
            (field) => currentSelectedFields.includes(field.name)
        ));
        onClose();
    };
    
    const onCancelButtonClick = () => {
        setCurrentSelectedFields(selectedFields.map((field) => field.name));
        onClose();
    };
    
    return (
        <div className={`active-fields-choice-modal ${isOpen ? 'open' : ''}`}>
            <div className="active-fields-choice-modal-content">
                <h2>Выберите столбцы:</h2>
                <form>
                    {fields.map((field) => (
                        <div key={`${field.name}-active-fields-choice-modal`}>
                            <input
                                type="checkbox"
                                id={field.name}
                                value={field.name}
                                checked={
                                    currentSelectedFields.includes(field.name)
                                }
                                onChange={onCurrentSelectionChange}
                            />
                            <label htmlFor={field.name}>{field.name}</label>
                        </div>
                    ))}
                </form>
                <div className="active-fields-choice-modal-buttons">
                    <button onClick={onSaveButtonClick}>Сохранить</button>
                    <button onClick={onCancelButtonClick}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default ActiveFieldsChoiceModal;
