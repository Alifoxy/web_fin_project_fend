import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IStatus, IStatuses} from "../../interfaces";
import {statusService} from "../../services";

interface IState {
    status: IStatus|null
    statuses: IStatus[],
    statusByName: IStatuses|null,
    total:number,
    current_page:number,
}

const initialState: IState = {
    status:null,
    statuses: [],
    statusByName: null,
    total: 0,
    current_page:0,
}

const getStatusesByPage = createAsyncThunk<IStatuses, {page:string|undefined}>(
    'statusSlice/getByPage',
    async ({page},thunkAPI) => {
        try {
            const {data} = await statusService.getAllByPage(page);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getAllStatuses = createAsyncThunk<IStatuses>(
    'statusSlice/getAll',
    async (_,thunkAPI) => {
        try {
            const {data} = await statusService.getAll();
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByName = createAsyncThunk<IStatuses, {name:string|undefined}>(
    'statusSlice/getRecordById',
    async ({name}, thunkAPI) => {
        try {
            const {data} = await statusService.getStatusByName(name);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const statusSlice = createSlice({
    name: 'statusSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(getStatusesByPage.fulfilled, (state, action) => {
                const {page, data, total} = action.payload;
                state.current_page = +page
                state.statuses = data;
                state.total = total;
            })
            .addCase(getAllStatuses.fulfilled, (state, action) => {
                const {data, total} = action.payload;
                state.statuses = data;
                state.total = total;
            })
            .addCase(getByName.fulfilled, (state, action) => {
                state.statusByName = action.payload
            })
})

const {reducer: statusesReducer, actions} = statusSlice

const statusesActions = {
    ...actions,
    getAllStatuses,
    getStatusesByPage,
    getByName,
}

export {
    statusesReducer,
    statusesActions
}