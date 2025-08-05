import React from "react";

interface ErrorWindowProps {
    message: string | null;
    onClose: () => void;
}

export const ErrorWindow: React.FC<ErrorWindowProps> = ({ message, onClose }) => {

if (!message) {
    return null;
}

return (
    <div className="dialog-backdrop">
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <h2 className={'er_title'}>Помилка!</h2>
            <p>{message}</p>
            <button className={'button1 button3 dialog_button'} onClick={onClose}>ОК</button>
        </div>
    </div>
);
};