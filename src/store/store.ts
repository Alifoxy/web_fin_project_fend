import {configureStore} from "@reduxjs/toolkit";
import {createRecordReducer, deviceReducer, recordsReducer, statusesParamsReducer} from "./slices";
import {clientsReducer} from "./slices";
import {manufacturersReducer} from "./slices/manufacturerSlice";
import {statusesReducer} from "./slices/statusSlice";
import {create_deleteManufacturerReducer} from "./slices/create_deleteManufacturerSlice";
import {create_deleteStatusReducer} from "./slices/create_deleteStatusSlice";
import {changeStatusReducer} from "./slices/changeStatusSlice";

const store = configureStore({
    reducer: {
        new_record: createRecordReducer,
        records: recordsReducer,
        clients: clientsReducer,
        devices: deviceReducer,
        change_status: changeStatusReducer,
        manufacturers: manufacturersReducer,
        statuses: statusesReducer,
        change_status_params: statusesParamsReducer,
        create_delete_manufacturers: create_deleteManufacturerReducer,
        create_delete_statuses: create_deleteStatusReducer,
    }
})

export {
    store
}