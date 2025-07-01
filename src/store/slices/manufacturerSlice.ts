import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IManufacturer, IManufacturers} from "../../interfaces";
import {manufacturerService} from "../../services";

interface IState {
    manufacturers: IManufacturer[],
    manufacturerByName: IManufacturers|null,
    total_pages:number,
    current_page:number,
}

const initialState: IState = {
    manufacturers: [],
    manufacturerByName: null,
    total_pages: 10,
    current_page:0,
}

const getManufacturersByPage = createAsyncThunk<IManufacturers, {page:string|undefined}>(
    'manufacturerSlice/getManufacturersByPage',
    async ({page},thunkAPI) => {
        try {
            const {data} = await manufacturerService.getAllByPage(page);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getAllManufacturers = createAsyncThunk<IManufacturers>(
    'manufacturerSlice/getAll',
    async (_,thunkAPI) => {
        try {
            const {data} = await manufacturerService.getAll();
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getByName = createAsyncThunk<IManufacturers, {manufacturer:string|undefined}>(
    'manufacturerSlice/getManufacturerByName',
    async ({manufacturer}, thunkAPI) => {
        try {
            const {data} = await manufacturerService.getManufacturerByName(manufacturer);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const manufacturerSlice = createSlice({
    name: 'manufacturerSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllManufacturers.fulfilled, (state, action) => {
                const {data} = action.payload;
                state.manufacturers = data;
            })
            .addCase(getManufacturersByPage.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page
                state.manufacturers = data;
            })
            .addCase(getByName.fulfilled, (state, action) => {
                state.manufacturerByName = action.payload
            })
})

const {reducer: manufacturersReducer, actions} = manufacturerSlice

const manufacturersActions = {
    ...actions,
    getAllManufacturers,
    getManufacturersByPage,
    getByName,
}

export {
    manufacturersReducer,
    manufacturersActions
}