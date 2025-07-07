import React, {FC, PropsWithChildren, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IDeviceDetails} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeStatusActions, resetCh} from "../../store/slices/changeStatusSlice";
import {resetM} from "../../store/slices/create_deleteManufacturerSlice";

interface IProps extends PropsWithChildren {
    SetDevice:IDeviceDetails
}

const Device: FC<IProps> = ({SetDevice}) => {
    const {id:device_id, model, status, manufacturer} = SetDevice;
    const {statuses} = useAppSelector(state => state.statuses);
    const {manufacturers} = useAppSelector(state => state.manufacturers);
    const dispatch = useAppDispatch();
    const [valueS, setValueS] = useState(status.status)
    const [valueM, setValueM] = useState(manufacturer)
    const navigate = useNavigate()

    const toGetRecDet = () => {
        navigate(`${device_id}/details`)
    };

    const handleStatusChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = (event.target.value)
        setValueS(newStatus);
        console.log(newStatus)

        if (newStatus) {
            const body = {status: newStatus}
            console.log('THIS IS BODY!!!!!!', body)
            dispatch(changeStatusActions.changeDeviceStatus({id: device_id, body}))

        } else {
            dispatch(resetCh())
        }
    }

    const handleManufacturerChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newManufacturer = (event.target.value)
        setValueM(newManufacturer);
        console.log(newManufacturer)

        if( newManufacturer||''){
            const body = {manufacturer:newManufacturer}
            console.log('THIS IS BODY!!!!!!' , body)
            dispatch(changeStatusActions.changeDeviceManufacturer({id:device_id, body}))
        }else{
            dispatch(resetM())
        }
    }

    const notMan = manufacturer === '' || manufacturer === null
    
    const stat = statuses.map(function(status ) {
        return <option className={'record_item'} key={status.id}  value={status.status} disabled={status.is_final || (status.manufacturer_required && notMan)}>{status.status}</option>
    });

    const man = manufacturers.map(function(manufacturer ) {
        return <option className={'record_item'} key={manufacturer.id}  value={manufacturer.manufacturer} >{manufacturer.manufacturer}</option>
    });

    return (
        <div className={'record'}>
            <div className={'table_item'}>{model}</div>
            <div className={'table_item'}>
                <select value={valueS||''} onChange={handleStatusChange} disabled={status.is_final} className={'select_input'}>
                    <option value=''></option>
                    {stat}
                </select>
            </div>
            <div className={'table_item'}>
                <select value={valueM || ''} onChange={handleManufacturerChange}  disabled={ status.is_final} className={'select_input'}>
                    <option value='' disabled={status.manufacturer_required}></option>
                    {man}
                </select>
            </div>

            <button className={'button1'} onClick={toGetRecDet}>
                Детальніше...
            </button>
        </div>
    );
};

export {Device};