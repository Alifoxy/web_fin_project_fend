// @ts-ignore
import React from "react";
import {GetDevicesByStatus} from "../../components/Devices/DevicesByStatus";

const DevicesByStatusPage = () => {
    return (
        <div className={'record_page'}>
            <GetDevicesByStatus/>
        </div>
    );
};

export {DevicesByStatusPage};