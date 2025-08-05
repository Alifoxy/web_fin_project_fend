import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clientService} from "../../services";
import {IClientDetails, IClients} from "../../interfaces";

interface IState {
    clients: IClientDetails[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    temp:boolean,
    clientById: IClientDetails|null,
    total:number,
    current_page:number,
}

const initialState: IState = {
    clients:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    temp:true,
    clientById:null,
    total: 0,
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
                const {page, data, total} = action.payload;
                state.current_page = +page
                state.clients = data;
                state.total = total;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.clientById = action.payload
            })
            .addCase(getClientsByPhone.fulfilled, (state, action) => {
                const {data} = action.payload;
                state.clients = data
            })
            .addCase(clientExists.fulfilled, (state, action) => {
                const {data} = action.payload;
                state.clients = data
                console.log('this is data_after!!!!!!!', action.payload.data)
            })
})

const {reducer: clientsReducer, actions} = clientSlice;

const clientsActions = {
    ...actions,
    getAllClients,
    getById,
    clientExists,
    getClientsByPhone
}

export {
    clientsReducer,
    clientsActions
}