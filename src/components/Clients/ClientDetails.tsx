import React, {FC, PropsWithChildren} from "react";
import {IClientDetails} from "../../interfaces";
import '../Styles/RecordsStyle.css';
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    ClientDetails: IClientDetails
}
const ClientDetails: FC<IProps> = ({ClientDetails}) => {
    const {name, surname, email, phone} = ClientDetails;
    const navigate = useNavigate()

    const client_record = ClientDetails.records.map(function(record ) {

        const toGetRecDet = () => {
            navigate(`record/${record.id}`)
        };

        return <li className={'record_item'} key={record.id}><button onClick={toGetRecDet} className={'button1'}>{record.record_num}</button></li>
    });

    return (
        <div className={'det_div'}>
            <div className={'inner_det_block'}>
                <h4 className={'title2'}> Клієнт</h4>
                <div>Ім'я: {name}</div>
                <div>Прізвище: {surname}</div>
                <div>Електронна пошта:{email}</div>
                <div>Номер телефону: {phone}</div>

                <h4 className={'title2'}> Квитанції</h4>
                <div className={'rec_cli'}>
                    <ul>
                        {client_record}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export {ClientDetails};