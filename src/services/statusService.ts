import {IRes} from "../types";
import {IDeviceDetails, INewStatus, IStatus, IStatuses} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const statusService = {
    getAll: (): IRes<IStatuses> => apiService.get(urls.statuses.base),
    getAllByPage: (page:string='1'): IRes<IStatuses> => apiService.get(urls.statuses.byPage, {params: {page}}),
    getStatusByName: (name:string=''): IRes<IStatuses> => apiService.get(urls.statuses.byName,{params: {name}}),
    createStatus: (body: INewStatus ): IRes<INewStatus> => apiService.post(urls.statuses.base, body),
    changeStatus: ( device_id:string , body: INewStatus): IRes<IDeviceDetails> => apiService.patch(urls.devices.changeStatus(device_id), body),
    deleteStatus: (status_id: string): IRes<IStatus> => apiService.delete(urls.statuses.byId(status_id)),
};

export {
    statusService
}