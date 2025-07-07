import React from "react";
import {useNavigate} from "react-router-dom";

const CreateNewSuccessPage = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate(-2)
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
        <div className={'success_div'}>
            <h2 className={'success_title'}>Новий клієнт та квитанція були успішно створені!</h2>
            <div className={'success_button_div'}>
                <div>
                    <button onClick={HandlePrint} className={'button1 button3'}> {'Роздрукувати'} </button>
                </div>
                <div>
                    <button onClick={back} className={'button1 button3'}> {'Назад'} </button>
                </div>
            </div>
        </div>

    );
};

export {CreateNewSuccessPage};