import React from "react";
import {GetDevicesByManufacturer} from "../../components";

const DevicesByManufacturerPage = () => {

    return (
        <div className={'record_page'}>
            <GetDevicesByManufacturer/>
        </div>
    );
};

export {DevicesByManufacturerPage};