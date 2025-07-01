import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IDeviceDetails, IDevices} from "../../interfaces";
import {deviceService} from "../../services";

interface IState {
    devices: IDeviceDetails[],
    deviceById: IDeviceDetails|null,
    total_pages:number,
    current_page:number,
}

const initialState: IState = {
    devices:[],
    deviceById:null,
    total_pages: 50,
    current_page:0,
};

const getAllDevices = createAsyncThunk<IDevices, {page:string|undefined}>(
    'deviceSlice/getAll',
    async ({page},thunkAPI) => {
        try {
            const {data} = await deviceService.getAll(page);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByModel = createAsyncThunk<IDevices, {page:string|undefined, search:string|undefined}>(
    'deviceSlice/getByModel',
    async ({page, search},thunkAPI) => {
        try {
            const {data} = await deviceService.getByModel(page,search);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByStatus = createAsyncThunk<IDevices, {page:string|undefined, status:string|undefined}>(
    'deviceSlice/getByStatus',
    async ({page, status},thunkAPI) => {
        try {
            const {data} = await deviceService.getByStatus(page,status);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByManufacturer = createAsyncThunk<IDevices, {page:string|undefined, manufacturer:string|undefined}>(
    'deviceSlice/getByManufacturer',
    async ({page, manufacturer},thunkAPI) => {
        try {
            const {data} = await deviceService.getByManufacturer(page,manufacturer);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getById = createAsyncThunk<IDeviceDetails, {id:string}>(
    'deviceSlice/getDeviceById',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await deviceService.getById(id);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const closeDevice = createAsyncThunk<IDeviceDetails, {id:string}>(
    'deviceSlice/closeDevice',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await deviceService.closeDeviceRecord(id);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const deviceSlice = createSlice({
    name: 'deviceSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllDevices.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page;
                state.devices = data;
            })
            .addCase(getByModel.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page;
                state.devices = data;
            })
            .addCase(getByStatus.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page;
                state.devices = data;
            })
            .addCase(getByManufacturer.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page;
                state.devices = data;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.deviceById = action.payload
            })
            .addCase(closeDevice.fulfilled, (state, action) => {
                state.deviceById = action.payload
            })
})

const {reducer: deviceReducer, actions} = deviceSlice;

const deviceActions = {
    ...actions,
    getAllDevices,
    getByModel,
    getByStatus,
    getByManufacturer,
    getById,
    closeDevice
}

export {
    deviceReducer,
    deviceActions
}