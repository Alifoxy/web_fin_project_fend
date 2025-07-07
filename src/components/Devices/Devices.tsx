import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Device} from "./Device";
import {deviceActions} from '../../store';
import {useAppDispatch, useAppSelector} from "../../hooks";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {statusesActions} from "../../store/slices/statusSlice";
import {manufacturersActions} from "../../store/slices/manufacturerSlice";
import {useSelector} from "react-redux";


interface IProps extends PropsWithChildren {
}

const Devices: FC<IProps> = () => {
    const {devices, total_pages, current_page} = useAppSelector(state => state.devices);
    const { changeStatus} = useSelector((state:any) => state.change_status);
    const { changeManufacturer } = useSelector((state:any) => state.change_status);
    const [query]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        if(changeStatus||changeManufacturer){
            dispatch(deviceActions.getAllDevices({page}))
        }
        dispatch(deviceActions.getAllDevices({page}))
        dispatch(statusesActions.getAllStatuses())
        dispatch(manufacturersActions.getAllManufacturers())
    }, [dispatch, query, page, changeStatus, changeManufacturer])

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        navigate(`${value}`)
    };

    console.log(devices)
    return (
        <div>
            <div className={'records'}>
                <div className={'table_labels'}>
                    <div className={'table_label_item'}>Модель</div>
                    <div className={'table_label_item'}>Статус</div>
                    <div className={'table_label_item'}>Виробник</div>
                </div>
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