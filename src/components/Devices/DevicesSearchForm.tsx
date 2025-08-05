import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks";

const DevicesSearchForm = () => {
    const {handleSubmit,reset} = useForm();
    const {current_page} = useAppSelector(state => state.devices);
    const [,setQuery] = useSearchParams({query:''})
    const [searchModel, setSearchModel]=useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(searchModel)
    }, [setQuery, searchModel])

    const handleChange = (event:any) => {
        const newModel = (event.target.value)
        setSearchModel(newModel)
    }

    const Search: SubmitHandler<any> = () => {
        console.log(searchModel)
        reset()
        navigate(`search/model/${searchModel}/1`)
    };

    return (
        <div>
            <div>
                <h2 className={'title3'}>Знайти пристрої за назвою моделі</h2>
            </div>
                <form onSubmit={handleSubmit(Search)}>
                    <div className={'search_div'}>
                        <input type="text" placeholder={'назва моделі'} className={'search_input'} value={searchModel} onChange={handleChange}/>
                        <button type="submit" onSubmit={Search} className={'button1'} disabled={!searchModel}>{searchModel ? 'Знайти' : 'Введіть назву моделі'}</button>
                    </div>
                </form>
        </div>
    );
};

export {DevicesSearchForm};