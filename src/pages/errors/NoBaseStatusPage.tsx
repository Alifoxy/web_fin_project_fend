import React from "react";
import {NoBaseStatus} from "../../components";
const NoBaseStatusPage = () => {

    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Відсутній базовий статус!</h2>
                <NoBaseStatus/>
            </div>
        </div>
    );
};

export {NoBaseStatusPage};