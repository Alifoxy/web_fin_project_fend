import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";


const RecordsForm = () => {
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
    // SubmitHandler<any>
    const search:SubmitHandler<any> = () => {
        reset()
        navigate(`${number}`)
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

            {/*<form onSubmit={handleSubmit(search)}>*/}
            {/*    <input type="text" placeholder={'find by number'} value={number} onChange={handleChange}/>*/}
            {/*    <button className={'button'} disabled={!number}>{number ? 'search' : 'enter record number'}</button>*/}
            {/*</form>*/}
        </div>

    );
};

export {RecordsForm};