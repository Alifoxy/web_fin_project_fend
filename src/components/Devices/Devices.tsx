import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Device} from "./Device";
import {deviceActions} from '../../store';
import {useAppDispatch, useAppSelector} from "../../hooks";
import '../Styles/RecordsStyle.css';
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {statusesActions} from "../../store/slices/statusSlice";


interface IProps extends PropsWithChildren {
}

const Devices: FC<IProps> = () => {
    const {devices, total_pages, current_page} = useAppSelector(state => state.devices);
    const [query, setQuery]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        dispatch(deviceActions.getAllDevices({page}))
        dispatch(statusesActions.getAllStatuses())
    }, [dispatch, query, page])

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        let current_page = value
        setQuery(query_page => {
            query_page.set('page', current_page.toString())
            return query_page
        })
        navigate(`${current_page}`)
    };

    console.log(devices)
    return (
        <div>
            <div className={'records'}>
                {devices.map((device => <Device key={device.id} SetDevice={device}/>))}
            </div>
            <div className={'pagination_div'}>
                <Stack spacing={2} className={'pagination'}>
                    <Pagination count={total_pages} page={current_page} color='primary' size="large" className={'pag'}
                                onChange={handleChange}/>
                </Stack>
            </div>
        </div>

    )
};

export {Devices};