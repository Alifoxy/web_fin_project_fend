const baseURL = 'http://localhost:3006'

const records = '/records'
const clients ='/clients'
const devices ='/devices'
const statuses ='/statuses'
const manufacturers ='/manufacturers'

const urls = {
    records: {
        base: records,
        createNew:`${records}/createNew`,
        joinOld:`${records}/joinOld`,
        byParams:`${records}/by_params` ,
        byId: (record_id:string): string => `${records}/${record_id}`,
    },
    clients: {
        base: clients,
        byParams: `${clients}/by_params`,
        byId: (client_id: string): string => `${clients}/${client_id}`,

    },
    devices: {
        base: devices,
        byParams: `${devices}/by_params`,
        changeStatus: (device_id: string): string => `${devices}/${device_id}/changeStatus`,
        byId: (device_id: string): string => `${devices}/${device_id}`,

    },
    statuses: {
        base: statuses,
        byName: `${statuses}/byName`,
        byPage: `${statuses}/byPage`,
        byId: (status_id: string): string => `${statuses}/${status_id}`,

    },
    manufacturers: {
        base: manufacturers,
        byName: `${manufacturers}/byName`,
        byId: (manufacturer_id: string): string => `${manufacturers}/${manufacturer_id}`,

    },

}

export {
    baseURL,
    urls
}

// const rec_by_params = '/records/by_params'
// const createNew ='/records/createNew'
// const joinOld ='/records/joinOld'
// const cli_by_params = '/clients/by_params'