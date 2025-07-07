import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {IManufacturer} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {create_deleteManufacturerActions} from "../../store/slices/create_deleteManufacturerSlice";
import {manufacturersActions} from "../../store/slices/manufacturerSlice";
import {useParams} from "react-router-dom";

interface IProps extends PropsWithChildren {
    SetManufacturer:IManufacturer

}
const Manufacturer: FC<IProps> = ({SetManufacturer}) => {
    const {id:m_id, manufacturer, created} = SetManufacturer;
    const dispatch = useAppDispatch();
    const {page} = useParams()
    const [refreshKey, setRefreshKey] = useState(false);

    useEffect(() => {
        dispatch(manufacturersActions.getManufacturersByPage({page}))
    }, [dispatch, refreshKey, page])

    const DeleteM = async () => {
        await dispatch(create_deleteManufacturerActions.deleteManufacturer({id: m_id}))
        setRefreshKey(prevKey => !prevKey);
    }

    return (
        <div className={'record'}>
            <div  className={'table_item'}>{manufacturer}</div>
            <div  className={'table_item'}>{created}</div>

            <button className={'delete_button'} onClick={DeleteM}>
                X
            </button>
        </div>
    );
};

export {Manufacturer};