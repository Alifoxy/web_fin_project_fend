import {IClientDetails} from "../clients";
import {IStatus} from "../statuses";

export interface IDeviceDetails{
    id: string;
    record_id: string;
    client_id: string;
    model: string;
    equipment: string;
    break_info: string;
    result: string;
    client: IClientDetails;
    status: IStatus;
    manufacturer: string;
    price: string;
    created: string;
    updated: string;
}