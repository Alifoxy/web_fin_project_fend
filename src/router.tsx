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
    ManufacturersCreatePage, SearchDevicesPage
} from "./pages";
import {DevicesByStatusPage} from "./pages/devices/DevicesByStatusPage";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [

            {
                index: true, element: <Navigate to={'records/1'}/>
            },
            {
                path: 'records_create',element:<CreateRecordPage/>,children:[
                    {
                        path: 'success', element: <CreateRecordSuccessPage/>
                    }
                ]
            },
            {
                path: 'records_create/client_exists',element:<ClientExistsPage/>,
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
            // {
            //     path: 'manufacturers/create_success', element: <ManufacturersSuccessPage/>
            // },
            {
                path: 'records/:record_id/details', element: <RecordDetailsPage/>
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
                path: 'clients/search',element: <SearchClientsPage/>, children:[
                    {
                        path: ':phone_num', element: <ClientsByPhonePage/>
                    },
                ]
            },
            {
                path: 'devices/search',element: <DevicesByStatusPage/>, children:[
                    {
                        path: ':status/:page', element: <DevicesByStatusPage/>
                    },
                ]

            },
            {
                path: 'devices/search/:device_id/details',element: <DeviceDetailsPage/>
            },

            {
                path: 'clients/search/:phone_num/:client_id/details',element: <ClientDetailsPage/>
            },
            {
                path: 'clients/search/:phone_num/:client_id/details/record/:record_id',element: <RecordDetailsPage/>
            },

            // {
            //     path: 'search',element: <SearchPage/>, children:[
            //         {
            //             path: ':genre_id/:genre_name', element: <MoviesByGenrePage/>
            //         },
            //         {
            //             path: ':query', element: <MoviesByTitlePage/>
            //         },
            //     ]
            // },

            // {
            //     path: 'search/:genre_id/:genre_name/details/:movie_id', element: <MovieDetailsPage/>
            // },
            // {
            //     path: 'search/:query/details/:movie_id', element: <MovieDetailsPage/>
            // },

        ]
    }
]);

export {
    router
}