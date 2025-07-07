import React from "react";
import {RecordsForm} from "../../components";
import {Outlet} from "react-router-dom";

const SearchRecordsPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <RecordsForm/>
                <Outlet/>
            </div>
        </div>
    );
};

export {SearchRecordsPage};