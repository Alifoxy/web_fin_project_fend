export interface IClientDetails{
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    records: [{
        id: string,
        record_num: string,
    }]
}