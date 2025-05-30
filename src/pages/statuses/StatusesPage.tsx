import {StatusCreateForm, Statuses} from "../../components";
import React from "react";
import {Outlet} from "react-router-dom";

const StatusesPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Статуси</h2>
                <Statuses/>
            </div>
        </div>
    );
};
 export {StatusesPage}

