import {IClientDetails} from "../clients";

export interface IRecordDetails{
    id: string;
    created: string;
    record_num: string;
    client: IClientDetails;
    devices: [{
        id:string;
        model: string;
        equipment: string;
        break_info: string;
    }];
}