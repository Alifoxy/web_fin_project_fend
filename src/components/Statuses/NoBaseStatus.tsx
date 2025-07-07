import React from "react";
import {useNavigate} from "react-router-dom";

const NoBaseStatus = () => {

    const navigate = useNavigate();

    const NavigateBack = () => {
        navigate(-1)

    };

    const NavigateToStatusCreation = () => {
        navigate('/statuses_create')

    };

    return (
        <div className={'records'}>
            <div className={'title1 title4'}>
                <h2>Ви не можете створити квитанцію без базового статусу. Перейдіть на сторінку створення статусу і створіть новий базовий статус, або позначте один з існуючих статусів як базовий.</h2>
            </div>

            <div className={'button_create_div'}>
                <div>
                    <button onClick={NavigateBack}  className={'button1'}>Назад</button>
                </div>
                <div>
                    <button onClick={NavigateToStatusCreation}  className={'button1'}>Створити статус</button>
                </div>
            </div>
        </div>
    );
};

export {NoBaseStatus};