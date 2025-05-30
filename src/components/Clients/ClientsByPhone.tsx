import React, {FC, PropsWithChildren, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {clientsActions} from "../../store";
import {Client} from "./Client";

interface IProps extends PropsWithChildren {
}

const GetClientsByPhone: FC<IProps> = () => {
    const {clients} = useAppSelector(state => state.clients)
    const {phone_num} = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clientsActions.getClientsByPhone({phone_num}))
    }, [dispatch, phone_num])

    const byPhone = () => {
        let cli
        if (!clients.length){
            cli =  <h2 className={'error_title'}>Не вдалося знайти клієнта за номером телефону {phone_num} :(</h2>
        }else {
            cli = clients.map(client => <Client key={client.id} SetClient={client}/>)
        }
        return cli
    }

    return (
        <div className={'records'}>
                {byPhone()}
        </div>
    );
};

export {GetClientsByPhone};