import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IDefaultInterface, IFinalInterface, IReturnReadyInterface, IStatus} from "../../interfaces";
import {statusService} from "../../services";
import {IManufacturerRequired} from "../../interfaces";

interface IState {
    status: IStatus|null
    isSPLoading:boolean;
    isSPSuccess:boolean;
    isSPError:boolean;
    message:string;
}

const initialState: IState = {
    status:null,
    isSPLoading:false,
    isSPSuccess:false,
    isSPError:false,
    message:''
}

const setDefaultStatus = createAsyncThunk<IStatus, {id:string, body: IDefaultInterface}>(
    'statusParamsSlice/setDefaultStatus',
    async ({id,body}, thunkAPI) => {
        try {
            const {data} = await statusService.setDefaultStatus(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const setReturnReadyStatus = createAsyncThunk<IStatus, {id:string, body: IReturnReadyInterface}>(
    'statusParamsSlice/setReturnReadyStatus',
    async ({id,body}, thunkAPI) => {
        try {
            const {data} = await statusService.setReturnReadyStatus(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const setFinalStatus = createAsyncThunk<IStatus, {id:string, body: IFinalInterface}>(
    'statusParamsSlice/setFinalStatus',
    async ({id,body}, thunkAPI) => {
        try {
            const {data} = await statusService.setFinalStatus(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const setManufacturerRequired = createAsyncThunk<IStatus, {id:string, body:IManufacturerRequired}>(
    'statusParamsSlice/setManufacturerRequired',
    async ({id, body}, thunkAPI) => {
        try {
            const {data} = await statusService.setManufacturerRequired(id,body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const statusParamsSlice = createSlice({
    name: 'statusParamsSlice',
    initialState,
    reducers: {
        resetStP: (state) => {
            state.status = null;
            state.isSPLoading = false;
            state.isSPSuccess = false;
            state.isSPError = false;
            state.message = '';
        },
    },
    extraReducers: builder =>
        builder
            .addCase(setDefaultStatus.fulfilled, (state, action) => {
                state.status = action.payload;
            })
            .addCase(setFinalStatus.fulfilled, (state, action) => {
                state.status = action.payload;
            })
            .addCase(setReturnReadyStatus.fulfilled, (state, action) => {
                state.status = action.payload;
            })
            .addCase(setManufacturerRequired.pending, (state) => {
                state.isSPLoading = true;
            })
            .addCase(setManufacturerRequired.fulfilled, (state, action) => {
                state.isSPLoading = false;
                state.isSPSuccess = true;
                state.status= action.payload;
                state.message = 'Status param changed successfully!'
            })
            .addCase(setManufacturerRequired.rejected, (state, action) => {
                state.isSPLoading = false;
                state.isSPError = true;
                state.message = 'Oops, something went wrong!';
            })
})

const {reducer: statusesParamsReducer, actions} = statusParamsSlice

export const { resetStP } = statusParamsSlice.actions;

const statusesParamsActions = {
    ...actions,
    setDefaultStatus,
    setFinalStatus,
    setManufacturerRequired,
    setReturnReadyStatus
}

export {
    statusesParamsReducer,
    statusesParamsActions
}