import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IDeviceDetails, IDevices} from "../interfaces";

const deviceService = {
    getAll: (page:string='1'): IRes<IDevices> => apiService.get(urls.devices.base,{params: {page}}),
    getById: (device_id: string): IRes<IDeviceDetails> => apiService.get(urls.devices.byId(device_id)),
    getByStatus: (page:string='1',status:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, status}}),
    // getClientsByPhone: (phone_num:string=''): IRes<IClients> => apiService.get(urls.clients.byParams,{params: {phone_num}}),
}

export {
    deviceService
}