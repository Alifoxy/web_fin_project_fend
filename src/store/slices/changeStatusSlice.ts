import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IDeviceDetails, INewStatus} from "../../interfaces";
import {statusService} from "../../services/statusService";

interface IState {
    changeStatus: IDeviceDetails|null,
    isChError: boolean,
    isChSuccess: boolean,
    isChLoading: boolean,
    message: unknown|string

}

const initialState: IState = {
    changeStatus:null,
    isChError: false,
    isChSuccess: false,
    isChLoading: false,
    message:''


}

const changeDeviceStatus = createAsyncThunk<IDeviceDetails, {id:string, body:INewStatus}>(
    'statusSlice/changeStatus',
    async ({id, body},  thunkAPI) => {
        try {
            const {data} = await statusService.changeStatus(id, body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)

// const setDefaultStatus = createAsyncThunk<IChangeStatus, {body:string|undefined}>(
//     'statusSlice/setDefaultStatus',
//     async ({body}, thunkAPI) => {
//         try {
//             const {data} = await statusService.changeStatus(body);
//             return data
//         } catch (error:any) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//
//     }
// )
//
// const setManRequired = createAsyncThunk<IChangeStatus, {body:string|undefined}>(
//     'statusSlice/setManRequired',
//     async ({body}, thunkAPI) => {
//         try {
//             const {data} = await statusService.changeStatus(body);
//             return data
//         } catch (error:any) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//
//     }
// )

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
                state.message = 'Oops, something went wrong!'; // The error message from thunkAPI.rejectWithValue
            })


})

const {reducer: changeStatusReducer, actions} = changeStatusSlice

export const { resetCh } = changeStatusSlice.actions;

const changeStatusActions = {
    ...actions,
    changeDeviceStatus,
}


export {
    changeStatusReducer,
    changeStatusActions
}