import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {clientService} from "../../services/clientService";
import {IClientDetails, IClients} from "../../interfaces";


interface IState {
    clients: IClientDetails[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    // new_cli: boolean,
    temp:boolean,
    clientById: IClientDetails|null,
    total_pages:number,
    current_page:number,
}

const initialState: IState = {
    clients:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    // new_cli:false,
    temp:true,
    clientById:null,
    total_pages: 50,
    current_page:0,

};



const getAllClients = createAsyncThunk<IClients, {page:string|undefined}>(

    'clientSlice/getAll',
    async ({page},thunkAPI) => {
        try {
            const {data} = await clientService.getAll(page);
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

const getById = createAsyncThunk<IClientDetails, {id:string}>(
    'clientSlice/getClientById',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await clientService.getById(id);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)

const getClientsByPhone = createAsyncThunk<IClients, {phone_num:string|undefined}>(
    'clientSlice/getByPhone',
    async ({phone_num}, thunkAPI) => {
        try {
            const {data} = await clientService.getClientsByPhone(phone_num);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)

const clientExists = createAsyncThunk<IClients, {client_phone:string}>(
    'clientSlice/clientExists',
    async ({client_phone}, thunkAPI) => {
        try {
            const {data} = await clientService.getClientsByPhone(client_phone);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)
//
// const getMoviesByTitle = createAsyncThunk<IMovies, {query:string|undefined}>(
//     'movieSlice/getByTitle',
//     async ({query}, thunkAPI) => {
//         try {
//             const {data} = await movieService.getMoviesByTitle(query);
//             return data
//         } catch (error:any) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//
//     }
// )


const clientSlice = createSlice({
    name: 'clientSlice',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },

    },
    extraReducers: builder =>
        builder
            .addCase(getAllClients.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.current_page = +page
                state.clients = data;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.clientById = action.payload
            })
            .addCase(getClientsByPhone.fulfilled, (state, action) => {
                const {data} = action.payload;
                state.clients = data
            })
            .addCase(clientExists.fulfilled, (state, action) => {
                const {data} = action.payload
                console.log('this is data_after!!!!!!!', action.payload.data)
                // const temp =data.length !== 0;
                // state.new_cli = data.length !== 0;
                // console.log('CLIENTSLICE new_cli!!!!!!!', state.new_cli)



            })
    // .addCase(getMoviesByTitle.fulfilled, (state, action) => {
    //     const {results} = action.payload;
    //     state.moviesByTitle = results
    // })
    // .addMatcher(!isFulfilled(getMoviesByTitle), (state) => {
    //     state.error = 'Movies not found'
    // })


})

const {reducer: clientsReducer, actions} = clientSlice;

const clientsActions = {
    ...actions,
    getAllClients,
    // getByParams,
    getById,
    clientExists,
    getClientsByPhone
}

// export const selectClientState = (state: {clientSlice: boolean} ) => state.clientSlice
export const selectClientState = (state: any) => state.new_cli;

export {
    clientsReducer,
    clientsActions
}