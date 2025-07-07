import React, {FC, PropsWithChildren} from 'react';
import {IRecordDetails} from "../../interfaces";

interface IProps extends PropsWithChildren{
    RecordDetails: IRecordDetails
}

const RecordCheckPrint: FC<IProps> = ({RecordDetails}) => {
    const {record_num, client, devices, created} = RecordDetails;

    const record_device = devices.map(function (device) {
        return <li className={'device'} key={device.id}>
            <div>Модель: {device.model}</div>
            <div>Комплектація: {device.equipment}</div>
            <div>Тип поломки: {device.break_info}</div>
            <div>Статус: {device.status.status}</div>
            <div>Вартість: {device.price}</div>
        </li>
    });

    return (
        <div>
        <div className={'print_data'}>
                    <h3 className={'rec_data_title'}> Квитанція</h3>
                    <div>номер квитанції: {record_num}</div>
                    <div>дата створення: {created}</div>
                </div>
                <div className={'print_data'}>
                    <h3 className={'rec_data_title'}> Клієнт</h3>
                    <div>ID: {client.id}</div>
                    <div>Ім'я: {client.name}</div>
                    <div>Прізвище: {client.surname}</div>
                    <div>Електронна пошта:{client.email}</div>
                    <div>Номер телефону: {client.phone}</div>
                </div>
                <div className={'print_data'}>
                    <h3 className={'rec_data_title'}> Пристрої</h3>
                    <ul>
                        {record_device}
                    </ul>
                </div>
            </div>
    );
}

export {RecordCheckPrint};