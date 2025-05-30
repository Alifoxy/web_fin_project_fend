import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";


const ClientsPageForm = () => {
    const {handleSubmit,reset} = useForm();
    const [,setQuery] = useSearchParams({query:''})
    const [phone, setPhone]=useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(phone)
    }, [setQuery, phone])

    const handleChange = (event:any) => {
        setPhone(event.target.value)
    }

    const search: SubmitHandler<any> = () => {
        reset()
        navigate(`search/${phone}`)
    };

    return (
        <div >
            <div>
                <h2 className={'title3'}>Знайти клієнта за номером телефону</h2>
            </div>
                <form onSubmit={handleSubmit(search)}>
                    <div className={'search_div'}>
                        <input type="text" placeholder={'номер телефону'} className={'search_input'} value={phone} onChange={handleChange}/>
                        <button type="submit" onSubmit={search} className={'button1'} disabled={!phone}>{phone ? 'Знайти' : 'Введіть номер телефону'}</button>
                    </div>
                </form>



            {/*<form onSubmit={handleSubmit(search)}>*/}
            {/*    <input type="text" placeholder={'find client by phone number'} value={phone} onChange={handleChange}/>*/}
            {/*    <button className={'button'} disabled={!phone}>{phone ? 'search' : 'enter phone number'}</button>*/}
            {/*</form>*/}
        </div>

    );
};

export {ClientsPageForm};