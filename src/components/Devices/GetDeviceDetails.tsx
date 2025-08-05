import React, {FC, PropsWithChildren, useEffect} from "react";
import {DeviceDetails} from "./DeviceDetails";
import {deviceActions, resetDev} from '../../store';
import {useAppDispatch, useAppSelector} from "../../hooks";
import '../Styles/RecordsStyle.css';
import {useNavigate, useParams} from "react-router-dom";


interface IProps extends PropsWithChildren {
}

const GetDeviceDetails: FC<IProps> = () => {
    const {deviceById} = useAppSelector(state => state.devices);
    const {notes_changed, price_changed} = useAppSelector(state => state.devices);
    const {device_id} = useParams()
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const set_device_id: string = device_id !== undefined? device_id:'';

    useEffect(() => {
        dispatch(deviceActions.getById({id:set_device_id}))
        dispatch(resetDev())
    }, [dispatch, set_device_id])

    const back = () => {
        navigate(-1)
        // navigate(+1)
    }

    return (
        <div className={'records'}>
            <div><button onClick={back} className={'button1'}> {'<< Назад'} </button></div>
            <div className={'record_dev_det'}>{deviceById && <DeviceDetails DeviceDetails={deviceById}/>}</div>
        </div>
    )
};

export {GetDeviceDetails};