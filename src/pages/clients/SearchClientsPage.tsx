import React from "react";
import {ClientsForm} from "../../components";
import {Outlet} from "react-router-dom";

const SearchClientsPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <ClientsForm/>
                <Outlet/>
            </div>
        </div>


    );
};

export {SearchClientsPage};