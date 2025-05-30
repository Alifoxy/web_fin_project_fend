import {IDeviceDetails} from "./deviceDetailsInterface";

export interface IDevices {
    data: IDeviceDetails[];
    page: string;
    total: number;
}