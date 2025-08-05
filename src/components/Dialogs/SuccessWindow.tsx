import React from "react";

interface SuccessWindowProps {
    message: string | null;
    onClose: () => void;
}

export const SuccessWindow: React.FC<SuccessWindowProps> = ({ message, onClose }) => {
    if (!message) {
        return null;
    }

    return (
        <div className="dialog-backdrop" onClick={onClose}>
            <div className={"dialog-content success-dialog"} onClick={(e) => e.stopPropagation()}>
                <h2 className={'sc_title'}>Успіх!</h2>
                <p>{message}</p>
                <button className={'button1 button3 dialog_button dialog_b_sc'} onClick={onClose}>ОК</button>
            </div>
        </div>
    );
};