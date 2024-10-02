import React, { useState } from "react";
import './ActiveFieldsChoiceModal.css';

function ActiveFieldsChoiceModal({
    isOpen, 
    onClose, 
    fields, 
    selectedFields, 
    onSelectionChange
}) {
    const [localSelectedFields, setLocalSelectedFields] = useState(selectedFields.map((field) => field.name));

    const handleSelectionChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
            setLocalSelectedFields([...localSelectedFields, value]);
        } else {
            setLocalSelectedFields(localSelectedFields.filter((field) => field !== value));
        }
    };
    
    const handleSave = () => {
        onSelectionChange(fields.filter((field) => localSelectedFields.includes(field.name)));
        onClose();
    };
    
    const handleCancel = () => {
        setLocalSelectedFields(selectedFields.map((field) => field.name));
        onClose();
    };
    
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Выберите значения:</h2>
                <form>
                    {fields.map((field) => (
                        <div key={`${field.name}-modal`}>
                            <input
                                type="checkbox"
                                id={field.name}
                                value={field.name}
                                checked={localSelectedFields.includes(field.name)}
                                onChange={handleSelectionChange}
                            />
                            <label htmlFor={field.name}>{field.name}</label>
                        </div>
                    ))}
                </form>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={handleCancel}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default ActiveFieldsChoiceModal;
