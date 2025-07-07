import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RecordDetails} from "./RecordDetails";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recordsActions, resetDev} from "../../store";

interface IProps extends PropsWithChildren {
}

const GetRecordDetails: FC<IProps> = () => {
    const {recordById} = useAppSelector(state => state.records);
    const {status_changed, deviceById}= useAppSelector(state => state.devices);
    const {record_id} = useParams()
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const set_record_id: string = record_id !== undefined? record_id:'';

    useEffect(() => {
        dispatch(recordsActions.getById({id:set_record_id}))
        dispatch(resetDev())
    }, [dispatch, set_record_id, status_changed, deviceById])

    const back = () => {
        navigate(-1)
    }

    return (
        <div className={'records'}>
            <div><button onClick={back} className={'button1'}> {'<< Назад'} </button></div>
            <div className={'record_det'}>{recordById && <RecordDetails RecordDetails={recordById}/>}</div>
        </div>
    );
};

export {GetRecordDetails};