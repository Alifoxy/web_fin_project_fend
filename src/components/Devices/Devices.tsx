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
    const {devices, current_page, total} = useAppSelector(state => state.devices);
    const { changeStatus , changeManufacturer} = useSelector((state:any) => state.change_status);
    const { price_changed } = useSelector((state:any) => state.devices);
    const [query]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        // if(changeStatus||changeManufacturer){
        //     dispatch(deviceActions.getAllDevices({page}))
        // }
        dispatch(deviceActions.getAllDevices({page}))
        dispatch(statusesActions.getAllStatuses())
        dispatch(manufacturersActions.getAllManufacturers())
    }, [dispatch, query, page, changeStatus, changeManufacturer, price_changed])

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        navigate(`${value}`)
    };

    const pages = total  / 10
    const total_pages = Math.ceil(pages)


    console.log(devices)
    return (
        <div>
            <div className={'records'}>
                <div className={'table_labels table_labels3'}>
                    <div className={'table_label_item table_label_item4'}>Модель</div>
                    <div className={'table_label_item table_label_item3'}>Статус</div>
                    <div className={'table_label_item table_label_item3'}>Виробник</div>
                    <div className={'table_label_item table_label_item3'}>Вартість роботи</div>
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