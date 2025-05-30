import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IDeviceDetails, IDevices} from "../../interfaces";
import {deviceService} from "../../services/deviceService";


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

// const getByParams = createAsyncThunk<IClients, void>(
//     'clientSlice/getAll',
//     async (_,thunkAPI) => {
//         try {
//             const {data} = await clientService.getByParams();
//             return data
//         } catch (error:any) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//
//     }
// )

const getByStatus = createAsyncThunk<IDevices, {page:string|undefined, status:string|undefined}>(
    'deviceSlice/getByParams',
    async ({page, status},thunkAPI) => {
        try {
            const {data} = await deviceService.getByStatus(page,status);
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
            .addCase(getByStatus.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page;
                state.devices = data;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.deviceById = action.payload
            })

    // .addCase(getMoviesByTitle.fulfilled, (state, action) => {
    //     const {results} = action.payload;
    //     state.moviesByTitle = results
    // })
    // .addMatcher(!isFulfilled(getMoviesByTitle), (state) => {
    //     state.error = 'Movies not found'
    // })


})

const {reducer: deviceReducer, actions} = deviceSlice;

const deviceActions = {
    ...actions,
    getAllDevices,
    getByStatus,
    getById,
}

export {
    deviceReducer,
    deviceActions
}