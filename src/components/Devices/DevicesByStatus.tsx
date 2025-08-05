import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {deviceActions} from "../../store";
import {Device} from "./Device";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {statusesActions} from "../../store/slices/statusSlice";
import {manufacturersActions} from "../../store/slices/manufacturerSlice";
import {useSelector} from "react-redux";

interface IProps extends PropsWithChildren {
}

const GetDevicesByStatus: FC<IProps> = () => {
    const {devices, current_page, total} = useAppSelector(state => state.devices)
    const { changeStatus , changeManufacturer} = useSelector((state:any) => state.change_status);
    const { price_changed } = useSelector((state:any) => state.devices);
    const {status} = useParams()
    const dispatch = useAppDispatch()
    const [query]= useSearchParams({page: '1'})
    const {page} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(deviceActions.getByStatus({page, status}))
        dispatch(statusesActions.getAllStatuses())
        dispatch(manufacturersActions.getAllManufacturers())
    }, [dispatch, status, query, page, changeStatus, changeManufacturer, price_changed])

    const byStatus = () => {
        let rec
        if (!devices.length){
            rec =  <h2 className={'error_title'}>Не вдалося знайти пристроїв за статусом {status} :(</h2>
        }else {
            rec = devices.map(device => <Device key={device.id} SetDevice={device}/>)
        }
        return rec
    }

    const back = () => {
        navigate(-1)
    }

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        dispatch(deviceActions.getByStatus({page, status}))
        navigate(`${value}`)
    };

    const pages = total  / 10
    const total_pages = Math.ceil(pages)

    return (
        <div>
            <div className={'records'}>
                <div>
                    <button onClick={back} className={'button1'}> {'<< Назад'} </button>
                </div>
                {byStatus()}
            </div>
            <div className={'pagination_div'}>
                <Stack spacing={2} className={'pagination'}>
                    <Pagination count={total_pages} page={current_page} color='primary' size="large" className={'pag'}
                                onChange={handleChange}/>
                </Stack>
            </div>
        </div>

    );
};

export {GetDevicesByStatus};