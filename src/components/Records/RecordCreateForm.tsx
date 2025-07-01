import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createRecordActions, reset, setCli} from "../../store";
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
}
const RecordsCreateForm: FC<IProps> = () => {

    const { newRecord, isLoading, isError, isSuccess, message} = useSelector((state:any) => state.new_record);
    const [client, setClient]=useState({name:'', surname:'',email:'',phone:''})
    const [device] = useState({model:'',equipment:'', break_info:''})
    const [devices, setDevices]=useState([device])
    const [body, setBody] = useState({client,devices})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const devs_not_empty = () => {
        const devs_empty = !device.model || !device.break_info || !device.equipment
        return !(devs_empty);
    }

    const devs_filled = () => {
        devices.forEach(devs_not_empty)
    }

    const cli_filled = () => {
        const cli_empty = !client.name || !client.surname || !client.email || !client.phone
        return !( cli_empty);

    }

    const handleClientChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    }

    const handleDeviceChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const newDevs = [...devices];
        newDevs[index] = {...newDevs[index], [name]: value};
        setDevices(newDevs);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(body)
        // @ts-ignore
        dispatch(createRecordActions.createRecord(body));
    };

    useEffect(() => {
        setBody({client: client, devices: devices})
        dispatch(setCli(body))
        
        const redirectToSuccess = () => {
            navigate('success')
        }

        const redirectToCliExists = () => {
            navigate(`client_exists`)
        }

        const redirectToNoBaseStatus = () => {
            navigate(`no_base_status`)
        }

        if (isError && message === 'Request failed with status code 400') {
            console.log('No base status!')
            redirectToNoBaseStatus()
        }
        
        if (isError && message === 'Request failed with status code 409') {
            console.log('Client exists!')
            redirectToCliExists()
            
        }
        if (isSuccess && newRecord) {
            redirectToSuccess()
        }
        
        return () => {
            dispatch(reset());
        };
    }, [newRecord, isError, isSuccess, message, dispatch, client, devices, body, navigate]);


    const handleAddDevice = () => {
        setDevices([...devices, {model:'', equipment:'' , break_info:'' }]); // Додаємо пустий девайс в масив девайсів
    };

    const handleRemoveDevice = (index:number) => {
        const newDevices = [...devices];
        newDevices.splice(index, 1);
        setDevices(newDevices);
      };

    return (
        <div className={'records'}>
            <form onSubmit={handleSubmit}>
                <div className={'create_div'}>
                    <div className={'title2'}>Дані клієнта</div>
                    <input type="text" placeholder={"ім'я"} name="name" value={client.name}
                           onChange={handleClientChange} className={'input'} required={true}/>
                    <input type="text" placeholder={'прізвище'} name="surname" value={client.surname}
                           onChange={handleClientChange} className={'input'} required={true}/>
                    <input type="text" placeholder={'електронна пошта'} name="email" value={client.email}
                           onChange={handleClientChange} className={'input'} required={true}/>
                    <input type="text" placeholder={'номер телефону'} name="phone" value={client.phone}
                           onChange={handleClientChange} className={'input'} required={true}/>
                </div>
                <div className={'create_div devs'}>
                    <div className={'title2'}>Дані пристроїв</div>
                    <div>
                        <button onClick={handleAddDevice} className={'button1 '}>Додати пристрій</button>
                    </div>
                    <div>
                        {devices.map((device, index) => (
                            <div key={index} className={'create_inputs'}>
                                <h3 className={'input_title'}>Пристрій# {index + 1}</h3>
                                <input type="text" placeholder={'модель'} name="model" value={device.model}
                                       onChange={(event) => handleDeviceChange(index, event)} className={'input'} required={true}/>
                                <input type="text" placeholder={'комплектація'} name="equipment" value={device.equipment}
                                       onChange={(event) => handleDeviceChange(index, event)} className={'input'} required={true}/>
                                <input type="text" placeholder={'тип поломки'} name="break_info" value={device.break_info}
                                       onChange={(event) => handleDeviceChange(index, event)} className={'input'} required={true}/>
                                <button onClick={() => handleRemoveDevice(index)} className={'button1 button2'}>Видалити пристрій</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={'button_create_div'}>
                <button type="submit"  onSubmit={handleSubmit}  disabled={isLoading|| !cli_filled||!devs_filled} className={'button1'}>Створити квитанцію</button>
                </div>
            </form>

        </div>

    );
};

export {RecordsCreateForm};