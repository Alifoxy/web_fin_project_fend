import {IClientDetails} from "../clients/clientDetailsInterface";

export interface IDeviceDetails{
    id: string;
    record_id: string;
    client_id: string;
    model: string;
    equipment: string;
    break_info: string;
    client: IClientDetails;
    status_name: string;
    manufacturer_name: string;
    created: string;
    updated: string;
}