import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Record} from "./Record";
import {recordsActions} from '../../store';
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import {useAppDispatch, useAppSelector} from "../../hooks";
import '../Styles/RecordsStyle.css';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

interface IProps extends PropsWithChildren {
}

const Records: FC<IProps> = () => {
    const {records, total_pages, current_page} = useAppSelector(state => state.records);
    const [query, setQuery]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()


    useEffect(() => {
        dispatch(recordsActions.getAllRecords({page}))
    }, [dispatch, query, page])

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        let current_page = value
        setQuery(query_page => {
            query_page.set('page', current_page.toString())
            return query_page
        })
        navigate(`${current_page}`)
    };

    console.log(records)
    return (
        <div>
            <div className={'records'}>
                <div className={'table_labels'}>
                    <div className={'table_label_item'}>Номер</div>
                    <div className={'table_label_item'}>Дата створення</div>
                    <div className={'table_label_item'}>Статус</div>
                </div>
                {records.map((record => <Record key={record.id} SetRecord={record}/>))}
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

export {Records};