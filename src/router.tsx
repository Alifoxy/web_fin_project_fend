import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {
    RecordsPage,
    ClientsPage,
    ErrorPage,
    RecordDetailsPage,
    ClientDetailsPage,
    SearchRecordsPage,
    RecordsByNumberPage,
    SearchClientsPage,
    ClientsByPhonePage,
    CreateRecordPage,
    CreateRecordSuccessPage,
    ClientExistsPage,
    DevicesPage,
    DeviceDetailsPage,
    CreateNewSuccessPage,
    JoinOldSuccessPage,
    ManufacturersPage,
    ManufacturersSuccessPage,
    StatusesPage,
    StatusesSuccessPage,
    StatusesCreatePage,
    ManufacturersCreatePage, DevicesByManufacturerPage, DevicesByModelPage, NoManufacturerPage, RecordCheckPrintPage,
} from "./pages";
import {DevicesByStatusPage} from "./pages";
import {NoBaseStatusPage} from "./pages";
import {StatusExistsPage} from "./pages/errors/StatusExists";
import {StatusParamsConflictPage} from "./pages/errors/StatusParamsConflictPage";
import {StatusParamsExistsPage} from "./pages/errors/StatusParamsExistsPage";
import {RecordPrintPage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [
            {
                index: true, element: <Navigate to={'records/1'}/>
            },
            // {
            //     path: 'records_create',element:<CreateRecordPage/>,children:[
            //         {
            //             path: 'success', element: <CreateRecordSuccessPage/>
            //         }
            //     ]
            // },
            {
                path: 'records_create',element:<CreateRecordPage/>,
            },
            {
                path: 'records_create/success',element:<CreateRecordSuccessPage/>,
            },
            {
                path: 'records_create/print',element:<RecordPrintPage/>,
            },
            {
                path: 'records_create/client_exists',element:<ClientExistsPage/>,
            },
            {
                path: 'records_create/no_base_status',element:<NoBaseStatusPage/>,
            },
            {
                path: 'records_create/client_exists/success/new',element:<CreateNewSuccessPage/>,
            },
            {
                path: 'records_create/client_exists/success/join',element:<JoinOldSuccessPage/>,
            },
            {
                path: 'records',element:<RecordsPage/>, children:[
                    {
                        path: ':page',element: <RecordsPage/>
                    },
                ],
            },
            {
                path: 'clients',element:<ClientsPage/>,children:[
                    {
                        path: ':page',element: <ClientsPage/>
                    },
                ]
            },
            {
                path: 'devices',element:<DevicesPage/>,children:[
                    {
                        path: ':page',element: <DevicesPage/>
                    },
                ]
            },
            {
                path: 'statuses',element:<StatusesPage/>,children:[
                    {
                        path: ':page',element: <StatusesPage/>
                    },

                ]
            },
            {
                path: 'statuses_create',element:<StatusesCreatePage/>,children:[
                    {
                        path: 'success',element: <StatusesSuccessPage/>
                    },
                    {
                        path: 'error_exists',element: <StatusExistsPage/>
                    },
                    {
                        path: 'error_params_conflict',element: <StatusParamsConflictPage/>
                    },
                    {
                        path: 'error_params_exist',element: <StatusParamsExistsPage/>
                    },

                ]
            },
            {
                path: 'manufacturers',element:<ManufacturersPage/>,children:[
                    {
                        path: ':page',element: <ManufacturersPage/>
                    },
                ]
            },
            {
                path: 'manufacturers_create',element:<ManufacturersCreatePage/>,children:[
                    {
                        path: 'success',element: <ManufacturersSuccessPage/>
                    },

                ]
            },
            {
                path: 'records/:record_id/details', element: <RecordDetailsPage/>
            },
            {
                path: 'records/:record_id/details/print',element: <RecordCheckPrintPage/>
            },
            {
                path: 'clients/:client_id/details', element: <ClientDetailsPage/>
            },
            {
                path: 'devices/:device_id/details', element: <DeviceDetailsPage/>
            },
            {
                path: 'clients/:client_id/details/record/:record_id', element: <RecordDetailsPage/>
            },
            {
                path: 'records/search',element: <SearchRecordsPage/>, children:[
                    {
                        path: ':rec_num', element: <RecordsByNumberPage/>
                    },
                ]
            },
            {
                path: 'records/search/:rec_num/:record_id/details',element: <RecordDetailsPage/>
            },
            {
                path: 'records/search/:rec_num/:record_id/details/print',element: <RecordPrintPage/>
            },
            {
                path: 'clients/search',element: <SearchClientsPage/>, children:[
                    {
                        path: ':phone_num', element: <ClientsByPhonePage/>
                    },
                ]
            },
            {
                path: 'devices/search/status/:status',element: <DevicesByStatusPage/>, children:[
                    {
                        path: ':page', element: <DevicesByStatusPage/>
                    },
                ]
            },
            {
                path: 'devices/search/status/:status/:device_id/details',element: <DeviceDetailsPage/>
            },
            {
                path: 'devices/search/manufacturer/:manufacturer',element: <DevicesByManufacturerPage/>, children:[
                    {
                        path: ':page', element: <DevicesByManufacturerPage/>
                    },
                ]
            },
            {
                path: 'devices/search/manufacturer/:manufacturer/:device_id/details',element: <DeviceDetailsPage/>
            },
            {
                path: 'devices/search/model/:search',element: <DevicesByModelPage/>, children:[
                    {
                        path: ':page', element: <DevicesByModelPage/>
                    },
                ]
            },
            {
                path: 'devices/search/model/:search/:device_id/details',element: <DeviceDetailsPage/>
            },
            {
                path: 'clients/search/:phone_num/:client_id/details',element: <ClientDetailsPage/>
            },
            {
                path: 'clients/search/:phone_num/:client_id/details/record/:record_id',element: <RecordDetailsPage/>
            },
        ]
    }
]);

export {
    router
}