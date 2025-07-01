import React, {FC, PropsWithChildren} from "react";
import {IRecordDetails} from "../../interfaces";
import '../Styles/RecordsStyle.css';
import {useDispatch} from "react-redux";
import {deviceActions} from "../../store";
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    RecordDetails: IRecordDetails
}
const RecordDetails: FC<IProps> = ({RecordDetails}) => {
    const {id, record_num, client, devices, created, is_closed} = RecordDetails;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(RecordDetails)


    const record_device = devices.map(function(device ) {
        const handleCloseRecord = () => {
            console.log(device.id)
            // @ts-ignore
            dispatch(deviceActions.closeDevice({id: device.id}))

        }

        return <li className={'device'} key={device.id}>
            <div>Модель: {device.model}</div>
            <div>Комплектація: {device.equipment}</div>
            <div>Тип поломки: {device.break_info}</div>
            <div>Статус: {device.status.status}</div>
            <button onClick={handleCloseRecord} className={'button1 '} disabled={!device.status.is_return_ready}>Видано</button>
        </li>
    });

    const handlePrintRecord = () => {


    }

    return (
        <div>
            <div>
                <h3 className={'rec_data_title'}> Квитанція</h3>
                <div>номер квитанції: {record_num}</div>
                <div>дата створення: {created}</div>
                <h3 className={'rec_data_title'}> Клієнт</h3>
                <div>
                    <div>ID: {client.id}</div>
                    <div>Ім'я: {client.name}</div>
                    <div>Прізвище: {client.surname}</div>
                    <div>Електронна пошта:{client.email}</div>
                    <div>Номер телефону: {client.phone}</div>
                </div>
                <h3 className={'rec_data_title'}> Пристрої</h3>
                <div>
                    <ul>
                        {record_device}
                    </ul>
                </div>
                <button onClick={handlePrintRecord} className={'button1 '}
                        disabled={!is_closed}>Роздрукувати
                </button>
            </div>
        </div>

    );
};

export {RecordDetails};