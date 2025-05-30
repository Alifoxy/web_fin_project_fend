import {IStatus} from "./statusInterface";

export interface IStatuses {
    data: IStatus[];
    page: string;
    total: number;
}