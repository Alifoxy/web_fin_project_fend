import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IChangeResult, IDeviceDetails, IDevices} from "../../interfaces";
import {deviceService} from "../../services";
import {IChangePrice} from "../../interfaces/devices/changeDevicePriceInterface";

interface IState {
    devices: IDeviceDetails[],
    deviceById: IDeviceDetails|null,
    total_pages:number,
    current_page:number,
    status_changed: boolean
    notes_changed: boolean
    price_changed: boolean
}

const initialState: IState = {
    devices:[],
    deviceById:null,
    total_pages: 50,
    current_page:0,
    status_changed: false,
    notes_changed: false,
    price_changed: false
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

const getByModel = createAsyncThunk<IDevices, {search:string|undefined}>(
    'deviceSlice/getByModel',
    async ({search},thunkAPI) => {
        try {
            const {data} = await deviceService.getByModel(search);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByStatus = createAsyncThunk<IDevices, {status:string|undefined}>(
    'deviceSlice/getByStatus',
    async ({status},thunkAPI) => {
        try {
            const {data} = await deviceService.getByStatus(status);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByManufacturer = createAsyncThunk<IDevices, {manufacturer:string|undefined}>(
    'deviceSlice/getByManufacturer',
    async ({manufacturer},thunkAPI) => {
        try {
            const {data} = await deviceService.getByManufacturer(manufacturer);
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

const changeDeviceResult = createAsyncThunk<IDeviceDetails, {id:string, body: IChangeResult}>(
    'deviceSlice/changeResultNotes',
    async ({id, body}, thunkAPI) => {
        try {
            const {data} = await deviceService.changeResultNotes(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const changeDevicePrice = createAsyncThunk<IDeviceDetails, {id:string, body: IChangePrice}>(
    'deviceSlice/changeDevicePrice',
    async ({id, body}, thunkAPI) => {
        try {
            const {data} = await deviceService.changePrice(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const deviceSlice = createSlice({
    name: 'deviceSlice',
    initialState,
    reducers: {
        resetStCh: (state) => {
            state.status_changed = false;
            state.price_changed = false;
            state.notes_changed = false;
        },
        resetDev:(state) => {
            state.deviceById = null;
        },
    },
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
                state.status_changed = true
            })
            .addCase(changeDeviceResult.fulfilled, (state, action) => {
                state.deviceById = action.payload
                state.notes_changed = true
            })
            .addCase(changeDevicePrice.fulfilled, (state, action) => {
                state.deviceById = action.payload
                state.price_changed = true
            })
})

const {reducer: deviceReducer, actions} = deviceSlice;

export const { resetStCh, resetDev } = deviceSlice.actions;

const deviceActions = {
    ...actions,
    getAllDevices,
    getByModel,
    getByStatus,
    getByManufacturer,
    getById,
    closeDevice,
    changeDeviceResult,
    changeDevicePrice,
}

export {
    deviceReducer,
    deviceActions
}