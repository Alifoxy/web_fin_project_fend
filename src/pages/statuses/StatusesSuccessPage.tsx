import {useNavigate} from "react-router-dom";
import React from "react";

const StatusesSuccessPage = () => {

    const navigate = useNavigate();
    const back = () => {
        navigate(-1)
    }

    return (
        <div className={'success_div'}>
            <h2 className={'success_title'}>Новий статус був успішно створений!</h2>
                <div>
                    <button onClick={back} className={'button1 button3'}> {'ОК'} </button>
                </div>
        </div>

    );
};

export {StatusesSuccessPage};