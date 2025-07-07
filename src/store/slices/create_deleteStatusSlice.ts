import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {INewStatus, IStatus} from "../../interfaces";
import {statusService} from "../../services";

interface IState {
    newStatus: INewStatus|null,
    isStError: boolean,
    isStSuccess: boolean,
    isStLoading: boolean,
    message: unknown|string
}

const initialState: IState = {
    newStatus:null,
    isStError: false,
    isStSuccess: false,
    isStLoading: false,
    message:'',
}

const createStatus = createAsyncThunk<INewStatus, INewStatus>(
    'create_deleteStatusSlice/createStatus',
    async (body, thunkAPI ) => {
        try {
            const {data} = await statusService.createStatus(body);
            return data
        } catch (error:any) {
            const message =  error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
);

const deleteStatus = createAsyncThunk<IStatus, {id:string}>(
    'create_deleteStatusSlice/deleteStatus',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await statusService.deleteStatus(id);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const create_deleteStatusSlice = createSlice({
    name: 'create_deleteStatusSlice',
    initialState,
    reducers: {
        resetSt: (state) => {
            state.newStatus = null;
            state.isStLoading = false;
            state.isStSuccess = false;
            state.isStError = false;
            state.message = '';
        },
    },
    extraReducers: builder =>
        builder
            .addCase(createStatus.pending, (state) => {
                state.isStLoading = true;
            })
            .addCase(createStatus.fulfilled, (state, action) => {
                state.isStLoading = false;
                state.isStSuccess = true;
                state.newStatus = action.payload;
                state.message = 'New status created successfully!'
            })
            .addCase(createStatus.rejected, (state, action) => {
                state.isStLoading = false;
                state.isStError = true;
                state.message = action.payload;
            })
            .addCase(deleteStatus.fulfilled, (state, action) => {
                state.isStSuccess = true;
                state.message = 'Status was deleted successfully!'
            })
})

const {reducer: create_deleteStatusReducer, actions} = create_deleteStatusSlice

export const { resetSt } = create_deleteStatusSlice.actions;

const create_deleteStatusActions = {
    ...actions,
    createStatus,
    deleteStatus,
}

export {
    create_deleteStatusReducer,
    create_deleteStatusActions
}