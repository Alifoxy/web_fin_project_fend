import React from "react";
import {ClientExists} from "../../components/Clients/ClientExists";
const ClientExistsPage = () => {

    return (
            <div className={'record_page'}>
                <h2 className={'title1'}>Клієнт вже існує!</h2>
                <ClientExists/>
            </div>
    );
};

export {ClientExistsPage};