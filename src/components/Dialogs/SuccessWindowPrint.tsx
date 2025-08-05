import React from "react";
import {useNavigate} from "react-router-dom";

interface SuccessWindowProps {
    message: string | null;
    onClose: () => void;
}

export const SuccessPrintWindow: React.FC<SuccessWindowProps> = ({ message, onClose }) => {
    const navigate = useNavigate();
    if (!message) {
        return null;
    }

    const NavToPrint = async () => {
        navigate(`/records_create/print`)
    }

    const HandlePrint = () => {
        NavToPrint().then(() =>
            window.print()
        )
    }

    return (
        <div className="dialog-backdrop" onClick={onClose}>
            <div className={"dialog-content success-dialog"} onClick={(e) => e.stopPropagation()}>
                <h2 className={'sc_title'}>Успіх!</h2>
                <p>{message}</p>
                <div className={'dialog_bt_div'}>
                    <button className={'button1 button3 dialog_button dialog_b_sc'} onClick={onClose}>ОК</button>
                    <button className={'button1 button3 dialog_button dialog_b_sc'} onClick={HandlePrint}>Роздрукувати</button>
                </div>
            </div>
        </div>
    );
};