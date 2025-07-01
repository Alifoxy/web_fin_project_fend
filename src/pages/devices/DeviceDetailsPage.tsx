import {GetDeviceDetails} from "../../components";

const DeviceDetailsPage = () => {

    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Детальна інформація пристрою</h2>
                <GetDeviceDetails/>
            </div>
        </div>
    );
};

export {DeviceDetailsPage};