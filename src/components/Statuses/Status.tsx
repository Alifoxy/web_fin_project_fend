import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import '../Styles/RecordsStyle.css';
import {IStatus} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {create_deleteStatusActions} from "../../store/slices/create_deleteStatusSlice";
import {useParams} from "react-router-dom";
import {statusesActions} from "../../store/slices/statusSlice";

interface IProps extends PropsWithChildren {
    SetStatus:IStatus

}
const Status: FC<IProps> = ({SetStatus}) => {
    const {id:s_id, status, created} = SetStatus;
    const dispatch = useAppDispatch();
    const {page} = useParams()
    const [refreshKey, setRefreshKey] = useState(false);

    useEffect(() => {
        dispatch(statusesActions.getStatusesByPage({page}))
    }, [refreshKey, page, dispatch]);


    const DeleteS = async () => {
        await dispatch(create_deleteStatusActions.deleteStatus({id: s_id}))
        // handleRefreshData()
        setRefreshKey(prevKey => !prevKey);
    }

    return (
        <div className={'record'}>
            <div>{status}</div>
            <div>{created}</div>

            <button className={'button1'} onClick={DeleteS}>
                Видалити
            </button>
        </div>
    );
};

export {Status};