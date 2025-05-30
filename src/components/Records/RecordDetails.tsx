import React, {FC, PropsWithChildren} from "react";
import {IRecordDetails} from "../../interfaces";
import '../Styles/RecordsStyle.css';
// import {Posters} from "../Posters";
// import {SetDetRating} from "../../hooks";
// import {DescDiv, DetailsInnerDiv, InfoDiv} from "../Style/DetailsStyledComponents";

interface IProps extends PropsWithChildren {
    RecordDetails: IRecordDetails
}
const RecordDetails: FC<IProps> = ({RecordDetails}) => {
    const {record_num, client, devices, created} = RecordDetails;

    const record_device = devices.map(function(device ) {

        return <li className={'device'} key={device.id}>
            <div>
                <div>Модель: {device.model}</div>
                <div>Комплектація: {device.equipment}</div>
                <div>Тип поломки: {device.break_info}</div>
            </div>
        </li>
    });

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
            </div>
        </div>

    );
};

export {RecordDetails};