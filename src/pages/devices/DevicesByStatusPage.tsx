import React from "react";
import {GetDevicesByStatus} from "../../components";

const DevicesByStatusPage = () => {

    return (
        <div className={'record_page'}>
            <GetDevicesByStatus/>
        </div>
    );
};

export {DevicesByStatusPage};