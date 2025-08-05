import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks";

const StatusSelectSearch = () => {
    const [,setQuery] = useSearchParams({query:''})
    const {statuses} = useAppSelector(state => state.statuses);
    const {current_page} = useAppSelector(state => state.devices);
    const [value, setValue] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(value)
    }, [setQuery, value])

    const handleStatusChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = (event.target.value)
        setValue(newStatus);

        console.log(newStatus)

        if (newStatus) {
            navigate(`search/status/${newStatus}/1`)
        } else {
            console.log('something went wrong!')
        }
    }

    const stat = statuses.map(function(status ) {
        return <option className={'record_item'} key={status.id}  value={status.status}>{status.status}</option>
    });

    return (
        <div>
            <div>
                <h2 className={'title3'}>Знайти пристрої за статусом</h2>
            </div>
            <div>
                <select value={value||''} onChange={handleStatusChange} className={'select_input'}>
                    <option value=''></option>
                    {stat}
                </select>
            </div>
        </div>
    );
};

export {StatusSelectSearch};