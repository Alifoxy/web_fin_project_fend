import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks";


const StatusSelectSearch = () => {
    const [,setQuery] = useSearchParams({query:''})
    const {statuses} = useAppSelector(state => state.statuses);
    const [value, setValue] = useState('')
    const {page} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(value)
    }, [setQuery, value])


    const handleStatusChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = (event.target.value)
        setValue(newStatus);
        // const {value} = event.target;
        console.log(newStatus)
        if( newStatus ){
            navigate(`${value}/${page}`)
        }else{
            console.log('something went wrong!')

        }
    }

    const status = statuses.map(function(status ) {
        return <option className={'record_item'} key={status.id}  value={status.status}>{status.status}</option>
    });

    return (
        <div>
            <div>
                <h2 className={'title3'}>Знайти пристрої за статусом</h2>
            </div>
            <div>
                <select value={value} onChange={handleStatusChange}>
                    {status}
                </select>
            </div>
        </div>

    );
};

export {StatusSelectSearch};