import {IRecordDetails} from "./recordDetailsInterface";

export interface IRecords {
    data: IRecordDetails[];
    page: string;
    total: number;
}