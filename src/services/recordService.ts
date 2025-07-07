import {IRes} from "../types";
import {IRecordDetails, IRecords} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {INewRecord} from "../interfaces";

const recordService = {
    getAll: (page:string='1'): IRes<IRecords> => apiService.get(urls.records.base, {params: {page}}),
    getById: (record_id: string): IRes<IRecordDetails> => apiService.get(urls.records.byId(record_id)),
    getRecordsByNumber: (rec_num:string=''): IRes<IRecords> => apiService.get(urls.records.byParams,{params: {rec_num}}),
    createRecord: (body: INewRecord ): IRes<IRecordDetails> => apiService.post(urls.records.base, body),
    createNew: (body: INewRecord ): IRes<IRecordDetails> => apiService.post(urls.records.createNew, body),
    joinOld: (body: INewRecord): IRes<IRecordDetails> => apiService.post(urls.records.joinOld, body),
};


export {
    recordService
}