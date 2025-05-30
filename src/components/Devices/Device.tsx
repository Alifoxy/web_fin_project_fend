import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import '../Styles/RecordsStyle.css';
import {useNavigate} from "react-router-dom";
import {IDeviceDetails} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeStatusActions, resetCh} from "../../store/slices/changeStatusSlice";
import {useSelector} from "react-redux";

interface IProps extends PropsWithChildren {
    SetDevice:IDeviceDetails

}
const Device: FC<IProps> = ({SetDevice}) => {
    const {id:device_id, model, status_name} = SetDevice;
    const { changeStatus, isChError, isChSuccess, message } = useSelector((state:any) => state.change_status);
    const {statuses} = useAppSelector(state => state.statuses);
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(status_name)
    const navigate = useNavigate()

    const toGetRecDet = () => {
        navigate(`${device_id}/details`)
    };

    useEffect(() => {
        if (isChError) {
            alert(`Error: ${message}`);

        }
        if (isChSuccess && changeStatus) {
            alert(`${message}`);

        }

        return () => {
            dispatch(resetCh());
        };
    }, [changeStatus, dispatch, isChError, isChSuccess, message])


    // value={status.status}
    // const handleStatusChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     // setStat(event.target.value);
    //     // const {value} = event.target;
    //     console.log(body)
    //     dispatch(changeStatusActions.changeDeviceStatus({id:device_id, status: {status:event.target.value}}))
    //
    //     // await dispatch(changeStatusActions.changeDeviceStatus(body))
    // }

    const handleStatusChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = (event.target.value)
        setValue(newStatus);
        // const {value} = event.target;
        console.log(newStatus)
        if( newStatus ){
            const body = {status:newStatus}
            console.log('THIS IS BODY!!!!!!' , body)
            dispatch(changeStatusActions.changeDeviceStatus({id:device_id, body}))
        }else{
            dispatch(resetCh())

        }
    }
    
    const status = statuses.map(function(status ) {
        return <option className={'record_item'} key={status.id}  value={status.status}>{status.status}</option>
    });
    
    return (
        <div className={'record'}>
            <div>{model}</div>
            <div>
                <select value={value}  onChange={handleStatusChange} >
                        {status}
                    {/*<option value="someOption">Some option</option>*/}
                    {/*<option value="otherOption">Other option</option>*/}
                </select>
            </div>

            <button className={'button1'} onClick={toGetRecDet}>
                Детальніше...
            </button>
        </div>
    );
};

export {Device};