import React from "react";
import {useNavigate} from "react-router-dom";
const StatusParamsExistsPage = () => {

    const navigate = useNavigate();
    const NavigateBack = () => {
        navigate(-1)

    };

    return (
        <div>
            <div className={'record_page'}>
                <div className={'records'}>
                    <div className={'title1 title4'}>
                        <h2>Статус з параметром базовий або фінальний вже існує</h2>
                    </div>

                    <div className={'button_create_div'}>
                        <div>
                            <button onClick={NavigateBack} className={'button1'}>Назад</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {StatusParamsExistsPage};