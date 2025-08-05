import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Client} from "./Client";
import {clientsActions} from '../../store';
import {useAppDispatch, useAppSelector} from "../../hooks";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

interface IProps extends PropsWithChildren {
}

const Clients: FC<IProps> = () => {
    const {clients, current_page, total} = useAppSelector(state => state.clients);
    const [query, setQuery]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        dispatch(clientsActions.getAllClients({page}))
    }, [dispatch, query, page])

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        let current_page = value
        setQuery(query_page => {
            query_page.set('page', current_page.toString())
            return query_page
        })
        navigate(`${current_page}`)
    };

    const pages = total  / 10
    const total_pages = Math.ceil(pages)

    return (
        <div>
            <div className={'records'}>
                <div className={'table_labels'}>
                    <div className={'table_label_item'}>Прізвище</div>
                    <div className={'table_label_item'}>Ім'я</div>
                    <div className={'table_label_item'}>Номер телефону</div>
                </div>
                {clients.map((client => <Client key={client.id} SetClient={client}/>))}
            </div>
            <div className={'pagination_div'}>
                <Stack spacing={2} className={'pagination'}>
                    <Pagination count={total_pages} page={current_page} color='primary' size="large" className={'pag'}
                                onChange={handleChange}/>
                </Stack>
            </div>
        </div>
    )
};

export {Clients};