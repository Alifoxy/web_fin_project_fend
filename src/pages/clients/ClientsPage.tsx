import {Clients, ClientsPageForm} from "../../components";
import React from "react";

const ClientsPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Клієнти</h2>
                <ClientsPageForm/>
                <Clients/>
            </div>
        </div>
    );
};

export {ClientsPage};