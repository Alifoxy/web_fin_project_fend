import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {deviceActions} from "../../store";


const ManufacturerSelectSearch = () => {
    const [,setQuery] = useSearchParams({query:''})
    const {manufacturers} = useAppSelector(state => state.manufacturers);
    const {current_page} = useAppSelector(state => state.devices)
    const {page} = useParams()
    const {search_page} = useParams()
    const [value, setValue] = useState('')
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setQuery(value)
    }, [setQuery, value])


    const handleManufacturerChange =  (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newManufacturer = (event.target.value)
        setValue(newManufacturer);

        console.log(newManufacturer)
        if( newManufacturer ){
            dispatch(deviceActions.getAllDevices({page}))

            navigate(`search/manufacturer/${newManufacturer}/1`)
        }else{
            console.log('something went wrong!')

        }
    }

    const manufacturer = manufacturers.map(function(manufacturer ) {
        return <option className={'record_item'} key={manufacturer.id}  value={manufacturer.manufacturer}>{manufacturer.manufacturer}</option>
    });

    return (
        <div>
            <div>
                <h2 className={'title3'}>Знайти пристрої за виробником</h2>
            </div>
            <div>
                <select value={value||''} onChange={handleManufacturerChange} className={'select_input'}>
                    <option value=''></option>
                    {manufacturer}
                </select>
            </div>
        </div>
    );
};

export {ManufacturerSelectSearch};