import React, {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {deviceActions} from "../../store";
import {Device} from "./Device";

interface IProps extends PropsWithChildren {
}

const GetDevicesByStatus: FC<IProps> = () => {
    const {devices} = useAppSelector(state => state.devices)
    const {status} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(deviceActions.getByStatus({status}))
    }, [dispatch, status])

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

    return (
        <div>
            <div className={'records'}>
                <div>
                    <button onClick={back} className={'button1'}> {'<< Назад'} </button>
                </div>
                {byStatus()}
            </div>
        </div>

    );
};

export {GetDevicesByStatus};