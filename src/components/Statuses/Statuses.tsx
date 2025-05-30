import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Status} from "./Status";
import {useAppDispatch, useAppSelector} from "../../hooks";
import '../Styles/RecordsStyle.css';
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {statusesActions} from "../../store/slices/statusSlice";


interface IProps extends PropsWithChildren {
}

const Statuses: FC<IProps> = () => {
    const {statuses, total_pages, current_page} = useAppSelector(state => state.statuses);
    const [query, setQuery]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        dispatch(statusesActions.getStatusesByPage({page}))
    }, [dispatch, query, page])

    const handleChange = (event:ChangeEvent<unknown> , value:number) => {
        let current_page = value
        setQuery(query_page => {
            query_page.set('page', current_page.toString())
            return query_page
        })
        navigate(`${current_page}`)
    };

    console.log(statuses)
    return (
        <div>
            <div className={'records'}>
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