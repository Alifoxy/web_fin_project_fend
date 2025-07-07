import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {IDeviceDetails} from "../../interfaces";
import {deviceActions, resetStCh} from "../../store";
import {useAppDispatch} from "../../hooks";

interface IProps extends PropsWithChildren {
    DeviceDetails: IDeviceDetails
}

const DeviceDetails: FC<IProps> = ({DeviceDetails}) => {
    const {id, model, equipment, status, manufacturer, break_info, created, client, result, price} = DeviceDetails;
    const [res, setRes] = useState(result)
    const [pri, setPri] = useState(price)
    const [priceBody, setPriceBody] = useState({price: ''})
    const [resBody, setResBody] = useState({result: ''})
    const dispatch = useAppDispatch();

    useEffect(() => {
        setResBody({result: res})
        setPriceBody({price: pri})

    }, [result, price, res, pri]);

    const handleResultSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(resBody)

        // @ts-ignore
        dispatch(deviceActions.changeDeviceResult({id:id, body:resBody}));
        dispatch(resetStCh())
    };

    const handlePriceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(priceBody)
        // @ts-ignore
        dispatch(deviceActions.changeDevicePrice({id:id, body:priceBody}));
        dispatch(resetStCh())


    };

    const handleResultChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = event.target.value;
        setRes(val)
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = event.target.value;
        setPri(val)
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
                    <form onSubmit={handleResultSubmit}>
                        <div>
                            <div className={'title2'}>Результат роботи</div>
                            <textarea placeholder={"результат"} name="name" value={res}
                                      onChange={handleResultChange} className={'input result_input'} required={true}/>
                        </div>
                        <div className={'button_create_div'}>
                            <button type="submit" onSubmit={handleResultSubmit} disabled={!resBody}
                                    className={'button1'}>Редагувати результат
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <form onSubmit={handlePriceSubmit}>
                        <div>
                            <div className={'title2'}>Вартість роботи</div>
                            <textarea placeholder={"вартість"} name="name" value={pri}
                                  onChange={handlePriceChange} className={'price_input'} required={true}/>
                        </div>
                        <div className={'button_create_div'}>
                            <button type="submit" onSubmit={handlePriceSubmit} disabled={!priceBody}
                                className={'button1'}>Редагувати вартість
                            </button>
                        </div>
                </form>
            </div>

        </div>

    );
};

export {DeviceDetails};