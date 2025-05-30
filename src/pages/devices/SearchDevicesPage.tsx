import React from "react";
import {Outlet} from "react-router-dom";
import {StatusSelectSearch} from "../../components";
import {DevicesByStatusPage} from "./DevicesByStatusPage";

const SearchDevicesPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <StatusSelectSearch/>
                <Outlet/>
            </div>
        </div>


    );
};

export {SearchDevicesPage};