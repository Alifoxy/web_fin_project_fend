import React from "react";
import {GetDevicesByModel} from "../../components/Devices/DevicesByModel";

const DevicesByModelPage = () => {

    return (
        <div className={'record_page'}>
            <GetDevicesByModel/>
        </div>
    );
};

export {DevicesByModelPage};