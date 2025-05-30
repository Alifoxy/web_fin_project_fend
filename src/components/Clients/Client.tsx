import React, {FC, PropsWithChildren} from "react";
import '../Styles/RecordsStyle.css';
import {useNavigate} from "react-router-dom";
import {IClientDetails} from "../../interfaces";

interface IProps extends PropsWithChildren {
    SetClient:IClientDetails

}
const Client: FC<IProps> = ({SetClient}) => {
    const {id:client_id,surname,phone} = SetClient;
    const navigate = useNavigate()

    const toGetRecDet = () => {
        navigate(`${client_id}/details`)
    };


    return (
        <div className={'record'}>
            <div>{surname}</div>
            <div>{phone}</div>

            <button className={'button1'} onClick={toGetRecDet}>
                Детальніше...
            </button>
        </div>
    );
};

export {Client};