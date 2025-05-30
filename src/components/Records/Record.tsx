import React, {FC, PropsWithChildren} from "react";
import {IRecordDetails} from "../../interfaces";
import '../Styles/RecordsStyle.css';
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    SetRecord:IRecordDetails

}
const Record: FC<IProps> = ({SetRecord}) => {
    const {record_num:number,id:record_id} = SetRecord;

    const toGetRecDet = () => {
        navigate(`${record_id}/details`)
    };

    const navigate = useNavigate()
    
    return (
        <div className={'record'}>
            Квитанція № {number}
            <button className={'button1'} onClick={toGetRecDet}>
                Детальніше...
            </button>
        </div>
    );
};

export {Record};