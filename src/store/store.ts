import {configureStore} from "@reduxjs/toolkit";
import {createRecordReducer, deviceReducer, recordsReducer} from "./slices";
import {clientsReducer} from "./slices";
import {createNewReducer} from "./slices/createNewSlice";
import {joinOldReducer} from "./slices/joinOldSlice";
import {manufacturersReducer} from "./slices/manufacturerSlice";
import {statusesReducer} from "./slices/statusSlice";
import {create_deleteManufacturerReducer} from "./slices/create_deleteManufacturerSlice";
import {create_deleteStatusReducer} from "./slices/create_deleteStatusSlice";
import {changeStatusReducer} from "./slices/changeStatusSlice";
// import {themeReducer} from "./slices/recordSlice";

const store = configureStore({
    reducer: {
        new_record: createRecordReducer,
        new_new_record:createNewReducer,
        join_old_record:joinOldReducer,
        records: recordsReducer,
        clients: clientsReducer,
        devices: deviceReducer,
        change_status: changeStatusReducer,
        manufacturers: manufacturersReducer,
        statuses: statusesReducer,
        create_delete_manufacturers: create_deleteManufacturerReducer,
        create_delete_statuses: create_deleteStatusReducer,
    }
})

export {
    store
}