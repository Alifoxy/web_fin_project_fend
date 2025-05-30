import {IManufacturer} from "./manufacturerInterface";

export interface IManufacturers {
    data: IManufacturer[];
    page: string;
    total: number;
}