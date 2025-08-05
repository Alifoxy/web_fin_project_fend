import React, {ChangeEvent, FC, PropsWithChildren, useEffect} from "react";
import {Manufacturer} from "./Manufacturer";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {manufacturersActions} from "../../store/slices/manufacturerSlice";


interface IProps extends PropsWithChildren {
}

const Manufacturers: FC<IProps> = () => {
    const {manufacturers, current_page, total} = useAppSelector(state => state.manufacturers);
    const [query, setQuery]= useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {page} = useParams()

    useEffect(() => {
        dispatch(manufacturersActions.getManufacturersByPage({page}))
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

    console.log(manufacturers)
    return (
        <div>
            <div className={'records'}>
                <div className={'table_labels4'}>
                    <div className={'table_label_item'}>Виробник</div>
                    <div className={'table_label_item'}>Дата створення</div>
                </div>
                {manufacturers.map((manufacturer => <Manufacturer key={manufacturer.id}
                                                                  SetManufacturer={manufacturer}/>))}
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

export {Manufacturers};