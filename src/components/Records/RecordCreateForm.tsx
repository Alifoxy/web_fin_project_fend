import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createRecordActions, resetCR, resetRec} from "../../store";
import {useNavigate} from "react-router-dom";
import InputMask from "react-input-mask"
import {ErrorWindow, SuccessPrintWindow, ErrorWindowСliEx} from "../Dialogs";


interface IProps extends PropsWithChildren {
}

interface Client {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

interface Device {
    model: string;
    equipment: string;
    break_info: string;
}

interface Body {
    client: Client
    devices: Device[]
}

const RecordsCreateForm: FC<IProps> = () => {

    const { newRecord, isError, isSuccess, message, isNewError, isJoinError, isNewSuccess, isJoinSuccess, new_message, join_message} = useSelector((state:any) => state.new_record);
    const [client, setClient]=useState({name:'', surname:'', email:'', phone:''})
    const [device, setDevice] = useState({model:'',equipment:'', break_info:''})
    const [devices, setDevices]=useState<Device[]>([])
    const [body, setBody] = useState<Body>()
    const [unmPhone, setUnmPhone] = useState('')
    const phoneMask = '+380 (99) 999-99-99';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [exists, setExists] = useState<string | null>(null);

    const clearMessage = () => {
        setError(null);
        setSuccess(null);
        setExists(null)
    };

    useEffect(() => {
        setBody({client:client, devices:devices})

    }, [dispatch, client, devices])

    const cli_filled = () => {
        const cli_empty = !client
        return !( cli_empty);
    }

    const checkIfFilled = (value: string, mask: string) => {
        const unmaskedValue = value.replace(/[^0-9]/g, '');
        console.log(unmaskedValue)
        return unmaskedValue.length >= 12;
    }

    const isFilled = checkIfFilled(client.phone, phoneMask)
    console.log(isFilled)

    const handleClientChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setClient({ ...client, [name]:value});
        console.log(client)
    }

    const handleDeviceChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setDevice({ ...device, [name]:value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        dispatch(resetRec())
        event.preventDefault();
        console.log(body)
        // @ts-ignore
        dispatch(createRecordActions.createRecord(body));
    };

    useEffect(() => {
        if (isError && message === 'Request failed with status code 400') {
            console.log('No base status!')
            setError('Ви не можете створити квитанцію без базового статусу. Перейдіть на сторінку створення статусу і створіть новий базовий статус, або позначте один з існуючих статусів як базовий.')
            dispatch(resetCR());
        }
        if (isError && message === 'Request failed with status code 409') {
            console.log('Client exists!')
            setExists('Клієнт з таким номером телефону вже існує в базі. Ви можете видалити цього клієнта і створити нового або прив\'язати квитанцію до існуючого клієнта!')
        }
        if (isNewSuccess) {
            console.log(`${new_message}`);
            setSuccess('Новий клієнт та квитанція були успішно створені!')
            dispatch(resetCR());
        }
        if (isJoinSuccess) {
            setSuccess('Квитанція була успішно прив\'язана до існуючого клієнта!  ')
            console.log(`${join_message}`);
            dispatch(resetCR());
        }
        if (isNewError) {
            console.log(`Error: ${new_message}`);
            setError('Не вдалося створити нового клієнта')
            dispatch(resetCR());
        }
        if (isJoinError) {
            console.log(`Error: ${join_message}`);
            setError('Не вдалося прив\'язати квитанцію до існуючого клієнта')
            dispatch(resetCR());
        }
        if (isSuccess) {
            console.log(newRecord)
            setSuccess('Клієнт та квитанція були успішно створені!')
            dispatch(resetCR());
        }
        // return () => {
        //     dispatch(resetCR());
        // };

    }, [newRecord, isError, isSuccess, message, dispatch, navigate, client, devices, isNewError, isJoinError, isNewSuccess, isJoinSuccess, new_message, join_message,]);

    const createNew  = () => {
        console.log(body)
       clearMessage()
        // @ts-ignore
        dispatch(createRecordActions.createNew(body));
    };

    const joinOld = () => {
        console.log(body)
        clearMessage()
        // @ts-ignore
        dispatch(createRecordActions.joinOld(body));
    };

    const handleAddDevice = () => {
        if(device){
            setDevices((prevDevices) => [...prevDevices, device]);
            setDevice({model:'',equipment:'', break_info:''})
        }
    };

    const handleRemoveDevice = (index:number) => {
        const newDevices = [...devices];
        newDevices.splice(index, 1);
        setDevices(newDevices);
      };

    return (
        <div className={'records'}>
            <ErrorWindow message={error} onClose={clearMessage} />
            <ErrorWindowСliEx message={exists} onNew={createNew} onOld={joinOld}/>
            <SuccessPrintWindow message ={success} onClose={clearMessage}/>
            <form onSubmit={(event => handleSubmit(event))}>
                <div className={'create_div'}>
                    <div className={'title2'}>Дані клієнта</div>
                    <div className={'create_inputs cli_inputs'}>
                        <input type="text" placeholder={"ім'я"} name="name" value={client.name}
                               onChange={handleClientChange} className={'input'} required={true}/>
                        <input type="text" placeholder={'прізвище'} name="surname" value={client.surname}
                               onChange={handleClientChange} className={'input'} required={true}/>
                        <input type="text" placeholder={'електронна пошта'} name="email" value={client.email}
                               onChange={handleClientChange} className={'input'} required={true}/>
                        <InputMask
                            mask={phoneMask}
                            value={client.phone}
                            name={"phone"}
                            onChange={handleClientChange}
                            placeholder="+380 (__) ___-__-__"
                            maskChar="_" // Character to show for unfilled parts
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="tel"
                                    className="input" // Example class if using a UI framework
                                />
                            )}
                        </InputMask>
                        {!isFilled ? <p style={{ color: 'red' }}>Номер телефону має бути повністю заповнений</p> : <p></p>}
                        {/*<input type="tel" placeholder={'номер телефону'} name="phone" value={client.phone}*/}
                        {/*       onChange={handleClientChange} className={'input'} required={true}/>*/}
                    </div>
                </div>
                <div className={'create_div devs'}>
                    <div className={'title2'}>Дані пристроїв</div>
                    <div>
                        <div className={'create_inputs'}>
                            <input type="text" placeholder={'модель'} name="model" value={device.model}
                                   onChange={handleDeviceChange} className={'input'}
                                   required={false}/>
                            <input type="text" placeholder={'комплектація'} name="equipment" value={device.equipment}
                                   onChange={handleDeviceChange} className={'input'}
                                   required={false}/>
                            <input type="text" placeholder={'тип поломки'} name="break_info" value={device.break_info}
                                   onChange={handleDeviceChange} className={'input'}
                                   required={false}/>
                        </div>
                        <button onClick={handleAddDevice}
                                disabled={!device.model || !device.equipment || !device.break_info}
                                className={'button1 '}>Додати пристрій
                        </button>
                    </div>
                    <div>
                        {devices.length === 0 ? (<h3> У цій квитанції поки що відсутні пристрої!</h3>) : (
                            <ul className={"list-none"} >
                                {devices.map((device, index) => (
                                    <li key={index}>
                                        <div className={'create_inputs create_devices'}>
                                            <h3 className={'input_title'}>Пристрій# {index + 1}</h3>
                                            <div>
                                                Модель: {device.model}
                                            </div>
                                            <div>
                                                Комплектація: {device.equipment}
                                            </div>
                                            <div>
                                                Тип поломки: {device.break_info}
                                            </div>
                                            <button onClick={() => handleRemoveDevice(index)}
                                                    className={'button1 button2'}>Видалити
                                                пристрій
                                            </button>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className={'button_create_div'}>
                    <button type="submit"
                            disabled={devices.length === 0 || !cli_filled || !isFilled}
                            className={'button1'}>Створити квитанцію
                    </button>
                </div>
            </form>
        </div>
    );
};

export {RecordsCreateForm};