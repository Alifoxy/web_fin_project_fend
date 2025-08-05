import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {IDeviceDetails} from "../../interfaces";
import {deviceActions, resetStCh} from "../../store";
import {useAppDispatch} from "../../hooks";
import {changeStatusActions, resetCh} from "../../store/slices/changeStatusSlice";

interface IProps extends PropsWithChildren {
    DeviceDetails: IDeviceDetails
}

const DeviceDetails: FC<IProps> = ({DeviceDetails}) => {
    const {id, model, equipment, status, manufacturer, break_info, created, client, result, price} = DeviceDetails;
    const [res, setRes] = useState(result)
    // const [pri, setPri] = useState(price)
    const dispatch = useAppDispatch();

    const handleResultChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const result = event.target.value;
        setRes(result)
        if (result) {
            const body = {result:result}
            dispatch(deviceActions.changeDeviceResult({id:id, body}));
        } else {
            dispatch(resetStCh())
        }
    }

    return (
        <div className={'det_div'}>
            <h4 className={'title2'}> Пристрій</h4>
            <div>Модель: {model}</div>
            <div>Комплектація: {equipment}</div>
            <div>Виробник:{manufacturer}</div>
            <div>Статус: {status.status}</div>
            <div>Поломка: {break_info}</div>
            <div>Дата створення: {created}</div>
            <div>Вартість роботи: {price}</div>

            <h4 className={'title2'}> Клієнт</h4>
            <div>Ім'я: {client.name}</div>
            <div>Прізвище: {client.surname}</div>
            <div>Електронна пошта:{client.email}</div>
            <div>Номер телефону: {client.phone}</div>

            <div className={'dev_input_div'}>
                    <div>
                        <div className={'title2'}>Результат роботи</div>
                        <textarea placeholder={"результат"} name="name" value={res}
                                  onChange={handleResultChange} className={'input result_input'} required={true}/>
                    </div>
            </div>
        </div>
    );
};

export {DeviceDetails};