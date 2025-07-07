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
        changeManufacturer: (device_id: string): string => `${devices}/${device_id}/changeManufacturer`,
        closeRecordDevice: (device_id: string): string => `${devices}/${device_id}/closeDevice`,
        changeResult: (device_id: string): string => `${devices}/${device_id}/changeResult`,
        changePrice: (device_id: string): string => `${devices}/${device_id}/changePrice`,
        byId: (device_id: string): string => `${devices}/${device_id}`,
    },

    statuses: {
        base: statuses,
        byName: `${statuses}/byName`,
        byPage: `${statuses}/byPage`,
        setManufacturer: (status_id: string): string =>`${statuses}/${status_id}/setManufacturerRequired`,
        setDefault: (status_id: string): string => `${statuses}/${status_id}/setDefaultStatus`,
        setReturnReady: (status_id: string): string => `${statuses}/${status_id}/setReturnReadyStatus`,
        setFinal: (status_id: string): string => `${statuses}/${status_id}/setFinalStatus`,
        byId: (status_id: string): string => `${statuses}/${status_id}`,

    },

    manufacturers: {
        base: manufacturers,
        byName: `${manufacturers}/byName`,
        byPage: `${manufacturers}/byPage`,
        byId: (manufacturer_id: string): string => `${manufacturers}/${manufacturer_id}`,
    },
}

export {
    baseURL,
    urls
}