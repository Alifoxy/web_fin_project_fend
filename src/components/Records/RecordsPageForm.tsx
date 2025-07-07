import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const RecordsPageForm = () => {
    const {handleSubmit,reset} = useForm();
    const [,setQuery] = useSearchParams({query:''})
    const [number, setNumber]=useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(number)
    }, [setQuery, number])

    const handleChange = (event:any) => {
        setNumber(event.target.value)
    }

    const search:SubmitHandler<any> = () => {
        reset()
        navigate(`search/${number}`)
    };

    return (
        <div>
            <div>
                <h2 className={'title3'}>Знайти квитанцію за номером</h2>
            </div>
                <form onSubmit={handleSubmit(search)}>
                    <div className={'search_div'}>
                        <input type="text" placeholder={'номер квитанції'} className={'search_input'} value={number} onChange={handleChange}/>
                        <button type="submit" onSubmit={search} className={'button1'} disabled={!number}>{number ? 'Знайти' : 'Введіть номер квитанції'}</button>
                    </div>
                </form>
        </div>
    );
};

export {RecordsPageForm};