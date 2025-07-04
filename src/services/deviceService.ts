import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IChangeStatus, IDeviceDetails, IDevices, INewManufacturer} from "../interfaces";

const deviceService = {
    getAll: (page:string='1'): IRes<IDevices> => apiService.get(urls.devices.base,{params: {page}}),
    getById: (device_id: string): IRes<IDeviceDetails> => apiService.get(urls.devices.byId(device_id)),
    getByModel: (page:string='1', search:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, search}}),
    getByStatus: (page:string='1',status:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, status}}),
    getByManufacturer: (page:string='1',manufacturer:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, manufacturer }}),
    changeStatus: ( device_id:string , body: IChangeStatus): IRes<IDeviceDetails> => apiService.patch(urls.devices.changeStatus(device_id), body),
    changeManufacturer: ( device_id:string , body: INewManufacturer): IRes<IDeviceDetails> => apiService.patch(urls.devices.changeManufacturer(device_id), body),
    closeDeviceRecord: ( device_id:string ): IRes<IDeviceDetails> => apiService.patch(urls.devices.closeRecordDevice(device_id)),
}

export {
    deviceService
}