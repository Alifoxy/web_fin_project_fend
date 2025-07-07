import {IClientDetails} from "../clients";

export interface IRecordDetails{
    id: string;
    created: string;
    record_num: string;
    is_closed: boolean;
    client: IClientDetails;
    devices: [{
        id:string;
        model: string;
        equipment: string;
        break_info: string;
        price: string;
        status: {
            id: string;
            status: string;
            created: string;
            manufacturer_required: boolean;
            is_default: boolean;
            is_final: boolean;
            is_return_ready: boolean;
        }
    }];
}