import {RecordsCreateForm} from "../../components";
import React from "react";
import {Outlet} from "react-router-dom";

const CreateRecordPage = () => {
    return (
            <div className={'record_page'}>
                <h2 className={'title1'}>Створити нову квитанцію</h2>
                <Outlet/>
                <RecordsCreateForm/>
            </div>
    );
};

export {CreateRecordPage};