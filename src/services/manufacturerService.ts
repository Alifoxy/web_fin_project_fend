import {IRes} from "../types";
import {IManufacturer, IManufacturers, INewManufacturer} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const manufacturerService = {
    getAll: (): IRes<IManufacturers> => apiService.get(urls.manufacturers.base),
    getAllByPage: (page:string='1'): IRes<IManufacturers> => apiService.get(urls.manufacturers.byPage, {params: {page}}),
    getManufacturerByName: (manufacturer:string=''): IRes<IManufacturers> => apiService.get(urls.manufacturers.byName,{params: {manufacturer}}),
    createManufacturer: (body: INewManufacturer ): IRes<INewManufacturer> => apiService.post(urls.manufacturers.base, body),
    deleteManufacturer: (manufacturer_id: string): IRes<IManufacturer> => apiService.delete(urls.manufacturers.byId(manufacturer_id)),
};

export {
    manufacturerService
}