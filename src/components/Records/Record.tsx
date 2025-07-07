import React, {FC, PropsWithChildren} from "react";
import {IRecordDetails} from "../../interfaces";
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    SetRecord:IRecordDetails
}

const Record: FC<IProps> = ({SetRecord}) => {
    const {record_num:number,id:record_id, created, is_closed} = SetRecord;

    const setStatus = () =>{
        if (is_closed){
            return 'Закрито'
        } else{
            return 'Відкрито'
        }
    }

    const toGetRecDet = () => {
        navigate(`${record_id}/details`)
    };

    const navigate = useNavigate()
    
    return (
        <div className={'record'}>
            <div className={'table_item'}>{number}</div>
            <div className={'table_item'}>{created}</div>
            <div className={'table_item'}>{setStatus()}</div>
            <div>
                <button className={'button1'} onClick={toGetRecDet}>
                    Детальніше...
                </button>
            </div>
        </div>
    );
};

export {Record};