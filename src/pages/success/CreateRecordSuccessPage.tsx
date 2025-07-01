import React from "react";
import {useNavigate} from "react-router-dom";

const CreateRecordSuccessPage = () => {

    const navigate = useNavigate();
    const back = () => {
        navigate(-1)
    }

    return (
            <div className={'success_div'}>
                <h2 className={'success_title'}>Квитанція була успішно створена!</h2>
                <div>
                    <button onClick={back} className={'button1 button3'}> {'ОК'} </button>
                </div>
            </div>

    );
};

export {CreateRecordSuccessPage};