import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createRecordActions, resetCR, resetRec, setCli} from "../../store";
import {useNavigate} from "react-router-dom";

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

    const { newRecord, isError, isSuccess, message} = useSelector((state:any) => state.new_record);
    const [client, setClient]=useState({name:'', surname:'', email:'', phone:''})
    const [device, setDevice] = useState({model:'',equipment:'', break_info:''})
    const [devices, setDevices]=useState<Device[]>([])
    const [body, setBody] = useState<Body>()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cli_filled = () => {
        const cli_empty = !client
        return !( cli_empty);
    }

    const handleClientChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setClient({ ...client, [name]:value });
    }

    const handleDeviceChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setDevice({ ...device, [name]:value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        dispatch(resetRec())
        setBody({client:client, devices:devices})
        dispatch(setCli(body))
        event.preventDefault();
        console.log(body)
        // @ts-ignore
        dispatch(createRecordActions.createRecord(body));
    };

    useEffect(() => {
        if (isError && message === 'Request failed with status code 400') {
            console.log('No base status!')
            navigate(`no_base_status`)
        }
        
        if (isError && message === 'Request failed with status code 409') {
            console.log('Client exists!')
            navigate(`client_exists`)
        }

        if (isSuccess) {
            console.log(newRecord)
            navigate('success')
        }

        return () => {
            dispatch(resetCR());
        };

    }, [newRecord, isError, isSuccess, message, dispatch, navigate, client, devices]);

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
                        <input type="text" placeholder={'номер телефону'} name="phone" value={client.phone}
                               onChange={handleClientChange} className={'input'} required={true}/>
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
                            disabled={devices.length === 0 || !cli_filled }
                            className={'button1'}>Створити квитанцію
                    </button>
                </div>
            </form>
        </div>
    );
};

export {RecordsCreateForm};