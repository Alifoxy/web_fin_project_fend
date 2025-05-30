import React, {FC, PropsWithChildren, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recordsActions} from "../../store";
import {Record} from "./Record";

interface IProps extends PropsWithChildren {
}

const GetRecordsByNumber: FC<IProps> = () => {
    const {records} = useAppSelector(state => state.records)
    const {rec_num} = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(recordsActions.getRecordsByNumber({rec_num}))
    }, [dispatch, rec_num])

    const byNumber = () => {
        let rec
        if (!records.length){
            rec =  <h2 className={'error_title'}>Не вдалося знайти квитанцію за номером {rec_num} :(</h2>
        }else {
            rec = records.map(record => <Record key={record.id} SetRecord={record}/>)
        }
        return rec
    }

    return (
        <div className={'records'}>
                {byNumber()}
        </div>
    );
};

export {GetRecordsByNumber};