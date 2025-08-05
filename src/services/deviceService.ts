import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IChangeResult, IChangeStatus, IDeviceDetails, IDevices, INewManufacturer} from "../interfaces";
import {IChangePrice} from "../interfaces/devices/changeDevicePriceInterface";

const deviceService = {
    getAll: (page:string='1'): IRes<IDevices> => apiService.get(urls.devices.base,{params: {page}}),
    getById: (device_id: string): IRes<IDeviceDetails> => apiService.get(urls.devices.byId(device_id)),
    getByModel: ( page:string='1',search:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, search}}),
    getByStatus: (page:string='1', status:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, status}}),
    getByManufacturer: (page:string='1',manufacturer:string=''): IRes<IDevices> => apiService.get(urls.devices.byParams,{params:{page, manufacturer}}),
    changeStatus: ( device_id:string , body: IChangeStatus): IRes<IDeviceDetails> => apiService.patch(urls.devices.changeStatus(device_id), body),
    changeManufacturer: ( device_id:string , body: INewManufacturer): IRes<IDeviceDetails> => apiService.patch(urls.devices.changeManufacturer(device_id), body),
    changeResultNotes: ( device_id:string , body: IChangeResult): IRes<IDeviceDetails> => apiService.patch(urls.devices.changeResult(device_id), body),
    changePrice: ( device_id:string , body: IChangePrice): IRes<IDeviceDetails> => apiService.patch(urls.devices.changePrice(device_id), body),
    closeDeviceRecord: ( device_id:string): IRes<IDeviceDetails> => apiService.patch(urls.devices.closeRecordDevice(device_id)),
}

export {
    deviceService
}