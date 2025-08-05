import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createRecordActions} from "../../store";
import {useAppDispatch} from "../../hooks";

interface ErrorWindowProps {
    message: string | null;
    onOld: () => void;
    onNew: () => void;
}

export const ErrorWindowСliEx: React.FC<ErrorWindowProps> = ({ message, onOld, onNew}) => {

    if (!message) {
        return null;
    }

    return (
        <div className="dialog-backdrop">
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <h2 className={'er_title'}>Помилка!</h2>
                <p>{message}</p>
                <div className={'dialog_bt_div'}>
                    <button className={'button1 button3 dialog_button'} onClick={onNew}>Створити нового</button>
                    <button className={'button1 button3 dialog_button'} onClick={onOld}>Прив'язати до існуючого</button>
                </div>
            </div>
        </div>
    );
};