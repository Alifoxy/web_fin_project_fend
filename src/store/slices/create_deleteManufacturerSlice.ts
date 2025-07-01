import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IManufacturer, INewManufacturer} from "../../interfaces";
import {manufacturerService} from "../../services";

interface IState {
    newManufacturer: INewManufacturer|null,
    isMaError: boolean,
    isMaSuccess: boolean,
    isMaLoading: boolean,
    message: unknown|string
}

const initialState: IState = {
    newManufacturer:null,
    isMaError: false,
    isMaSuccess: false,
    isMaLoading: false,
    message:''
}

const createManufacturer = createAsyncThunk<INewManufacturer, INewManufacturer>(
    'create_deleteManufacturerSlice/createManufacturer',
    async (body, thunkAPI ) => {
        try {
            const {data} = await manufacturerService.createManufacturer(body);
            return data
        } catch (error:any) {
            const message =  error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
);

const deleteManufacturer = createAsyncThunk<IManufacturer, {id:string}>(
    'create_deleteManufacturerSlice/deleteManufacturer',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await manufacturerService.deleteManufacturer(id);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const create_deleteManufacturerSlice = createSlice({
    name: 'create_deleteManufacturerSlice',
    initialState,
    reducers: {
        resetM: (state) => {
            state.newManufacturer = null;
            state.isMaLoading = false;
            state.isMaSuccess = false;
            state.isMaError = false;
            state.message = '';
        },
    },
    extraReducers: builder =>
        builder
            .addCase(createManufacturer.pending, (state) => {
                state.isMaLoading = true;
            })
            .addCase(createManufacturer.fulfilled, (state, action) => {
                state.isMaLoading = false;
                state.isMaSuccess = true;
                state.newManufacturer = action.payload;
                state.message = 'New manufacturer created successfully!'
            })
            .addCase(createManufacturer.rejected, (state, action) => {
                state.isMaLoading = false;
                state.isMaError = true;
                state.message = 'Manufacturer already exists!';
            })
            .addCase(deleteManufacturer.fulfilled, (state, action) => {
                state.message = 'Manufacturer was deleted successfully!'
            })
})

const {reducer: create_deleteManufacturerReducer, actions} = create_deleteManufacturerSlice

export const { resetM } = create_deleteManufacturerSlice.actions;

const create_deleteManufacturerActions = {
    ...actions,
    createManufacturer,
    deleteManufacturer,
}

export {
    create_deleteManufacturerReducer,
    create_deleteManufacturerActions
}