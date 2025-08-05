import {StatusCreateForm} from "../../components";
import React from "react";
import {Outlet} from "react-router-dom";

const StatusesCreatePage = () => {

    return (
        <div className={'record_page'}>
                <h2 className={'title1'}>Створити новий статус</h2>
                <StatusCreateForm/>
                <Outlet/>
        </div>
    );
};
export {StatusesCreatePage}