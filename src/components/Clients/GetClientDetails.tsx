import React, {FC, PropsWithChildren, useEffect} from "react";
import {ClientDetails} from "./ClientDetails";
import {clientsActions} from '../../store';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate, useParams} from "react-router-dom";

interface IProps extends PropsWithChildren {
}

const GetClientDetails: FC<IProps> = () => {
    const {clientById} = useAppSelector(state => state.clients);
    const {client_id} = useParams()
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const set_client_id: string = client_id !== undefined? client_id:'';

    useEffect(() => {
        dispatch(clientsActions.getById({id:set_client_id}))
    }, [dispatch, set_client_id])

    const back = () => {
        navigate(-1)
    }

    return (
        <div className={'records'}>
            <div><button onClick={back} className={'button1'}> {'<< Назад'} </button></div>
            <div className={'record_det'}>{clientById && <ClientDetails ClientDetails={clientById}/>}</div>
        </div>
    )
};

export {GetClientDetails};