import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {create_deleteStatusActions, resetSt} from "../../store/slices/create_deleteStatusSlice";
import {reset} from "../../store";

interface IProps extends PropsWithChildren {
}
const StatusCreateForm: FC<IProps> = () => {

    const { newStatus, isStLoading, isStError, isStSuccess, message } = useSelector((state:any) => state.create_delete_statuses);
    // const [st_name, setStName]=useState({status:''})
    const [body, setBody]= useState({status:''})
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleStatusChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setBody({status: value});
    }
    //
    // const redirectToCliExists = () => {
    //
    //     navigate(`client_exists`)
    // }




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(body)
        // @ts-ignore
        dispatch(create_deleteStatusActions.createStatus(body));

    };

    useEffect(() => {
        // setBody({status: body.status})
        const redirectToSuccess = () => {
            navigate('success')
        }

        if (isStError) {
            alert(`Error: ${message}`);
        }
        if (isStSuccess && newStatus) {
            redirectToSuccess()
            alert(`${message}`);
        }



        // Clean up state on unmount or after success/error
        return () => {
            dispatch(resetSt());
        };
    }, [message, dispatch, newStatus, body.status, isStError, isStSuccess]);



    return (
        <div className={'records'}>
            <form onSubmit={handleSubmit}>
                <div className={'create_div'}>
                    <div className={'title2'}>Створити новий статус</div>
                    <input type="text" placeholder={"статус"} name="name" value={body.status}
                           onChange={handleStatusChange} className={'input'} required={true}/>
                </div>
                <div className={'button_create_div'}>
                    <button type="submit"  onSubmit={handleSubmit}  disabled={isStLoading|| !body.status} className={'button1'}>Створити</button>
                </div>
            </form>

        </div>

    );
};

export {StatusCreateForm};

