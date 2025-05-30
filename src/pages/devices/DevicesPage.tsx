import React from "react";
import {Devices, StatusSelectPage} from "../../components";

const DevicesPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Пристрої</h2>
                <StatusSelectPage/>
                <Devices/>
            </div>
        </div>
    );
};

export {DevicesPage};