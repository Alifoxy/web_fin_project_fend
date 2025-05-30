import React, {FC, PropsWithChildren} from "react";
import {IDeviceDetails} from "../../interfaces";
import '../Styles/RecordsStyle.css';
// import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    DeviceDetails: IDeviceDetails
}
const DeviceDetails: FC<IProps> = ({DeviceDetails}) => {
    const {model, equipment, status_name, manufacturer_name, break_info, created, client} = DeviceDetails;
    // const navigate = useNavigate()

    // const client_record = DeviceDetails.records.map(function(record ) {
    //
    //     const toGetRecDet = () => {
    //         navigate(`record/${record.id}`)
    //     };
    //
    //     return <li className={'record_item'} key={record.id}><button onClick={toGetRecDet}className={'button1'}>{record.record_num}</button></li>
    // });

    // const toGetRecDet = () => {
    //     navigate(`${client_record.}/details`)
    // };

    return (
        <div className={'det_div'}>
            <div className={'inner_det_block'}>
                <h4 className={'title2'}> Пристрій</h4>
                <div>Модель: {model}</div>
                <div>Комплектація: {equipment}</div>
                <div>Виробник:{manufacturer_name}</div>
                <div>Статус: {status_name}</div>
                <div>Поломка: {break_info}</div>
                <div>Дата створення: {created}</div>

                <h4 className={'title2'}> Клієнт</h4>
                {/*<div className={'rec_cli'}>*/}
                {/*</div>*/}
                <div>Ім'я: {client.name}</div>
                <div>Прізвище: {client.surname}</div>
                <div>Електронна пошта:{client.email}</div>
                <div>Номер телефону: {client.phone}</div>
            </div>
        </div>

    );
};

export {DeviceDetails};