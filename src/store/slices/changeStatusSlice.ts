import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IChangeStatus, IDeviceDetails, INewManufacturer} from "../../interfaces";
import {deviceService} from "../../services";

interface IState {
    changeStatus: IDeviceDetails|null,
    isChError: boolean,
    isChSuccess: boolean,
    isChLoading: boolean,
    changeManufacturer: IDeviceDetails|null,
    isMError: boolean,
    isMSuccess: boolean,
    isMLoading: boolean,
    message: unknown|string
}

const initialState: IState = {
    changeStatus:null,
    isChError: false,
    isChSuccess: false,
    isChLoading: false,
    changeManufacturer:null,
    isMError: false,
    isMSuccess: false,
    isMLoading: false,
    message:''
}

const changeDeviceStatus = createAsyncThunk<IDeviceDetails, {id:string, body:IChangeStatus}>(
    'statusSlice/changeStatus',
    async ({id, body},  thunkAPI) => {
        try {
            const {data} = await deviceService.changeStatus(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const changeDeviceManufacturer = createAsyncThunk<IDeviceDetails, {id:string, body:INewManufacturer}>(
    'statusSlice/changeManufacturer',
    async ({id, body},  thunkAPI) => {
        try {
            const {data} = await deviceService.changeManufacturer(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const changeStatusSlice = createSlice({
    name: 'changeStatusSlice',
    initialState,
    reducers: {
        resetCh: (state) => {
            state.changeStatus = null;
            state.isChLoading = false;
            state.isChSuccess = false;
            state.isChError = false;
            state.message = '';
        },
        resetM: (state) => {
            state.changeManufacturer = null;
            state.isMLoading = false;
            state.isMSuccess = false;
            state.isMError = false;
            state.message = '';
        },
    },
    extraReducers: builder =>
        builder
            .addCase(changeDeviceStatus.pending, (state) => {
                state.isChLoading = true;
            })
            .addCase(changeDeviceStatus.fulfilled, (state, action) => {
                state.isChLoading = false;
                state.isChSuccess = true;
                state.changeStatus= action.payload;
                state.message = 'Status changed successfully!'
            })
            .addCase(changeDeviceStatus.rejected, (state, action) => {
                state.isChLoading = false;
                state.isChError = true;
                state.message = 'Oops, something went wrong!';
            })
            .addCase(changeDeviceManufacturer.pending, (state) => {
                state.isMLoading = true;
            })
            .addCase(changeDeviceManufacturer.fulfilled, (state, action) => {
                state.isMLoading = false;
                state.isMSuccess = true;
                state.changeManufacturer= action.payload;
                state.message = 'Manufacturer changed successfully!'
            })
            .addCase(changeDeviceManufacturer.rejected, (state, action) => {
                state.isMLoading = false;
                state.isMError = true;
                state.message = 'Oops, something went wrong!';
            })
})

const {reducer: changeStatusReducer, actions} = changeStatusSlice

export const { resetCh } = changeStatusSlice.actions;

const changeStatusActions = {
    ...actions,
    changeDeviceStatus,
    changeDeviceManufacturer,
}

export {
    changeStatusReducer,
    changeStatusActions
}