import React from "react";
import {Devices, DevicesSearchForm, ManufacturerSelectSearch, StatusSelectSearch} from "../../components";


const DevicesPage = () => {

    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Пристрої</h2>
                <StatusSelectSearch/>
                <ManufacturerSelectSearch/>
                <DevicesSearchForm/>
                <Devices/>
            </div>
        </div>
    );
};

export {DevicesPage};