import {IRes} from "../types";
import {
    IDefaultInterface,
    IFinalInterface,
    IManufacturerRequired,
    INewStatus,
    IReturnReadyInterface,
    IStatus,
    IStatuses
} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const statusService = {
    getAll: (): IRes<IStatuses> => apiService.get(urls.statuses.base),
    getAllByPage: (page:string='1'): IRes<IStatuses> => apiService.get(urls.statuses.byPage, {params: {page}}),
    getStatusByName: (name:string=''): IRes<IStatuses> => apiService.get(urls.statuses.byName,{params: {name}}),
    createStatus: (body: INewStatus ): IRes<INewStatus> => apiService.post(urls.statuses.base, body),
    setDefaultStatus: ( status_id: string, body: IDefaultInterface  ): IRes<IStatus> => apiService.patch(urls.statuses.setDefault(status_id), body),
    setReturnReadyStatus: ( status_id: string, body: IReturnReadyInterface  ): IRes<IStatus> => apiService.patch(urls.statuses.setReturnReady(status_id), body),
    setFinalStatus: ( status_id: string, body: IFinalInterface  ): IRes<IStatus> => apiService.patch(urls.statuses.setFinal(status_id), body),
    setManufacturerRequired: ( status_id: string, body: IManufacturerRequired ): IRes<IStatus> => apiService.patch(urls.statuses.setManufacturer(status_id), body),
    deleteStatus: (status_id: string): IRes<IStatus> => apiService.delete(urls.statuses.byId(status_id)),
};

export {
    statusService
}