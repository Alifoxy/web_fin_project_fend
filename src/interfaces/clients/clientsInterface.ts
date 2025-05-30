import {IClientDetails} from "./clientDetailsInterface";

export interface IClients {
    data: IClientDetails[];
    page: string;
    total: number;
}