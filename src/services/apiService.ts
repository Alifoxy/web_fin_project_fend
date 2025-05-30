import axios from "axios";

import {baseURL} from "../constants";

const apiService = axios.create({baseURL});


// const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjFmMmI3NDEyZTI4YTA4ZmYwMGRhMTk3ODc1YjQzMiIsInN1YiI6IjYzZWY2MTdlY2RkYmJjMDA4YzIwYjgwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gOeNaSJT0F9oN2v1paJGgct0ByZYRNMura43C_XS_ho`
//
// apiService.interceptors.request.use((config) =>
//     {
//         config.headers.Authorization= `Bearer ${token}`
//         return config
//
//     }
//
// )

export {
    apiService
}