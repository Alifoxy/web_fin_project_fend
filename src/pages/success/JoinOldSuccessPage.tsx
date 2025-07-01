import React from "react";
import {useNavigate} from "react-router-dom";

const JoinOldSuccessPage = () => {

    const navigate = useNavigate();
    const back = () => {
        navigate(-2)
    }

    return (
            <div className={'success_div'}>
                <h2 className={'success_title'}>Квитанція була успішно прив'язана до існуючого клієнта!</h2>
                <div>
                    <button onClick={back} className={'button1 button3'}> {'ОК'} </button>
                </div>
            </div>

    );
};

export {JoinOldSuccessPage};