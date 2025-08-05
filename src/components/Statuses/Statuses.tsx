import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Status} from "./Status";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {statusesActions} from "../../store/slices/statusSlice";
import {useSelector} from "react-redux";


interface IProps extends PropsWithChildren {
}

const Statuses: FC<IProps> = () => {
    const {statuses, current_page, total} = useAppSelector(state => state.statuses);
    const {isStSuccess} = useSelector((state:any) => state.create_delete_statuses);
    const {status, isSPSuccess} = useSelector((state:any) => state.change_status_params);
    const [query, setQuery]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        dispatch(statusesActions.getStatusesByPage({page}))
    }, [dispatch, query, page, status, isSPSuccess, isStSuccess])

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
                <div className={'status_labels'}>
                    <div className={'table_labels2'}>
                        <div className={'table_label_item'}>Статус</div>
                        <div className={'table_label_item'}>Дата створення</div>
                    </div>
                    <div className={'table_labels5'}>
                        <div className={' table_label_item table_label_item2'}>Вказувати виробника</div>
                        <div className={' table_label_item table_label_item2'}>Базовий статус</div>
                        <div className={' table_label_item table_label_item2'}>Статус готовності</div>
                        <div className={' table_label_item table_label_item2'}>Фінальний статус</div>
                    </div>
                </div>

                {statuses.map((status => <Status key={status.id} SetStatus={status}/>))}
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

export {Statuses};