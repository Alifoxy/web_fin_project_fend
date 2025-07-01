import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {deviceActions} from "../../store";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {Device} from "./Device";

interface IProps extends PropsWithChildren {
}

const GetDevicesByStatus: FC<IProps> = () => {
    const {devices, total_pages, current_page} = useAppSelector(state => state.devices)
    const {page} = useParams()
    const {status} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(deviceActions.getByStatus({page, status}))
    }, [dispatch, page, status])

    const byStatus = () => {
        let rec
        if (!devices.length){
            rec =  <h2 className={'error_title'}>Не вдалося знайти пристроїв за статусом {status} :(</h2>
        }else {
            rec = devices.map(device => <Device key={device.id} SetDevice={device}/>)
        }
        return rec
    }

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        navigate(`${value}`)
    };

    const back = () => {
        navigate(-1)
    }

    return (
        <div>
            <div>
                <div>
                    <button onClick={back} className={'button1'}> {'<< Назад'} </button>
                </div>
            </div>
            <div className={'records'}>
                {byStatus()}
            </div>
            <div className={'pagination_div'}>
                <Stack spacing={2} className={'pagination'}>
                    <Pagination count={total_pages} page={current_page} color='primary' size="large"
                                className={'pag'}
                                onChange={handleChange}/>
                </Stack>
            </div>
        </div>

    );
};

export {GetDevicesByStatus};