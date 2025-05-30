import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {recordService} from "../../services";
import {INewRecord} from "../../interfaces";

interface IState {
    newRecord: INewRecord|null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: unknown|string
    body: INewRecord|null,

    // moviesByTitle:IMovie[],

}

const initialState: IState = {
    newRecord:null,
    body:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''


}

// recordData:{client:{name: '', surname: '', email: '', phone: ''} , devices: [{model: '', equipment: '', break_info:'' }]}
// {client:{name: '', surname: '', email: '', phone: ''} , devices: [{model: '', equipment: '', break_info:'' }]}

const createRecord = createAsyncThunk<INewRecord, INewRecord>(
    'recordSlice/createRecord',
    async (body, thunkAPI ) => {
        try {
            const {data} = await recordService.createRecord(body);
            return data
            // const newRecord = data
           // The resolved value will be the payload of the fulfilled action
        } catch (error:any) {
            const message =  error.message
            // Use the error message from the backend if available, otherwise a generic message
            return thunkAPI.rejectWithValue(message)

        }
    }
);

// const createNew = createAsyncThunk<INewRecord, INewRecord>(
//     'recordSlice/createNewRecord',
//     async (body, thunkAPI ) => {
//         try {
//             const {data} = await recordService.createNew(body);
//             return data// The resolved value will be the payload of the fulfilled action
//         } catch (error:any) {
//             const message =  error.message
//             // Use the error message from the backend if available, otherwise a generic message
//             return thunkAPI.rejectWithValue(message)
//
//         }
//     }
// );
//
// const joinOld = createAsyncThunk<INewRecord, INewRecord>(
//     'recordSlice/joinOldRecord',
//     async (body, thunkAPI ) => {
//         try {
//             const {data} = await recordService.joinOld(body);
//             return data// The resolved value will be the payload of the fulfilled action
//         } catch (error:any) {
//             // Use the error message from the backend if available, otherwise a generic message
//             return thunkAPI.rejectWithValue(error.response.data)
//
//         }
//     }
// );
// const createNewRecord = createAsyncThunk<INewRecord,recordData:{}>(
//     'recordSlice/createRecord',
//     async (recordData,rej) => {
//         try {
//             const {data} = await recordService.createNewRecord(recordData);
//             return data
//         } catch (error:any) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//
//     }
// )

// const selectRecordState = (state:IState) => state;

const createRecordSlice = createSlice({
    name: 'recordSlice',
    initialState,
    reducers: {
        reset: (state) => {
            state.newRecord = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        setCli: (state, action) => {
            state.body = action.payload ;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(createRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.newRecord = action.payload;
                state.message = 'Record created successfully!'
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'Client already exists!'; // The error message from thunkAPI.rejectWithValue
            })
            // .addCase(createNew.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.newRecord = action.payload;
            //     state.message = 'New record created successfully!'
            // })
            // .addCase(joinOld.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.newRecord = action.payload;
            //     state.message = 'Record joined successfully!'
            // })

    // .addCase(getMoviesByTitle.fulfilled, (state, action) => {
    //     const {results} = action.payload;
    //     state.moviesByTitle = results
    // })
    // .addMatcher(!isFulfilled(getMoviesByTitle), (state) => {
    //     state.error = 'Movies not found'
    // })


})

const {reducer: createRecordReducer, actions} = createRecordSlice

export const { reset, setCli } = createRecordSlice.actions;

const createRecordActions = {
    ...actions,
    createRecord,
}


export {
    createRecordReducer,
    createRecordActions
}