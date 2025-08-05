import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {create_deleteManufacturerActions, resetM} from "../../store/slices/create_deleteManufacturerSlice";
import {ErrorWindow, SuccessWindow} from "../Dialogs";

interface IProps extends PropsWithChildren {
}
const ManufacturerCreateForm: FC<IProps> = () => {

    const { newManufacturer, isMaLoading, isMaError, isMaSuccess, message } = useSelector((state:any) => state.create_delete_manufacturers);
    const [body, setBody]= useState({manufacturer:''})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const clearMessage = () => {
        setError(null);
        setSuccess(null);
    };

    const handleManufacturerChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setBody({manufacturer: value});

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(body)
        // @ts-ignore
        dispatch(create_deleteManufacturerActions.createManufacturer(body));

    };

    useEffect(() => {
        setBody({manufacturer: body.manufacturer})
        if (isMaError && message) {
            setError('Такий виробник вже існує!')
        }
        if (isMaSuccess && newManufacturer) {
            setSuccess('Виробник був успішно створений!')
        }

        return () => {
            dispatch(resetM());
        };
    }, [newManufacturer, message, dispatch, body.manufacturer, navigate, isMaError, isMaSuccess]);

    return (
        <div className={'records records2'}>
            <ErrorWindow message={error} onClose={clearMessage} />
            <SuccessWindow message ={success} onClose={clearMessage}/>
            <form onSubmit={handleSubmit}>
                <div className={'create_div create2'}>
                    <div className={'title2'}>Створити нового виробника</div>
                    <input type="text" placeholder={"виробник"} name="name" value={body.manufacturer}
                           onChange={handleManufacturerChange} className={'input'} required={true}/>
                </div>
                <div className={'button_create_div'}>
                <button type="submit"  onSubmit={handleSubmit}  disabled={isMaLoading|| !body.manufacturer} className={'button1'}>Створити</button>
                </div>
            </form>

        </div>

    );
};

export {ManufacturerCreateForm};

