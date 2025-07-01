import React, {FC, PropsWithChildren} from "react";
import {IDeviceDetails} from "../../interfaces";
import '../Styles/RecordsStyle.css';

interface IProps extends PropsWithChildren {
    DeviceDetails: IDeviceDetails
}
const DeviceDetails: FC<IProps> = ({DeviceDetails}) => {
    const {model, equipment, status, manufacturer_name, break_info, created, client} = DeviceDetails;

    return (
        <div className={'det_div'}>
            <div className={'inner_det_block'}>
                <h4 className={'title2'}> Пристрій</h4>

                <div>Модель: {model}</div>
                <div>Комплектація: {equipment}</div>
                <div>Виробник:{manufacturer_name}</div>
                <div>Статус: {status.status}</div>
                <div>Поломка: {break_info}</div>
                <div>Дата створення: {created}</div>

                <h4 className={'title2'}> Клієнт</h4>

                <div>Ім'я: {client.name}</div>
                <div>Прізвище: {client.surname}</div>
                <div>Електронна пошта:{client.email}</div>
                <div>Номер телефону: {client.phone}</div>
            </div>
        </div>

    );
};

export {DeviceDetails};