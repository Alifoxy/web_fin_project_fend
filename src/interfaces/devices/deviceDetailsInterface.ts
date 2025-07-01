import {IClientDetails} from "../clients";
import {IStatus} from "../statuses";

export interface IDeviceDetails{
    id: string;
    record_id: string;
    client_id: string;
    model: string;
    equipment: string;
    break_info: string;
    client: IClientDetails;
    status: IStatus;
    manufacturer_name: string;
    created: string;
    updated: string;

    // status: {
    //     name: string
    //     manufacturer_required: boolean
    //     is_default:boolean
    // };
}