import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IClients, IClientDetails} from "../interfaces";

const clientService = {
    getAll: (page:string='1'): IRes<IClients> => apiService.get(urls.clients.base,{params: {page}}),
    getById: (client_id: string): IRes<IClientDetails> => apiService.get(urls.clients.byId(client_id)),
    getClientsByPhone: (phone_num:string=''): IRes<IClients> => apiService.get(urls.clients.byParams,{params: {phone_num}}),
}

export {
    clientService
}