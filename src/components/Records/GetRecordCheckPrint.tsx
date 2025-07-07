import {FC, PropsWithChildren, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recordsActions} from "../../store";
import {RecordCheckPrint} from "./RecordCheckPrint";

interface IProps extends PropsWithChildren {
}

const GetRecordCheckPrint: FC<IProps> = () => {
    const {recordById} = useAppSelector(state => state.records);
    const {status_changed}= useAppSelector(state => state.devices);
    const {record_id} = useParams()
    const dispatch = useAppDispatch();

    const set_record_id: string = record_id !== undefined? record_id:'';

    useEffect(() => {
        dispatch(recordsActions.getById({id:set_record_id}))
    }, [dispatch, set_record_id, status_changed])

    return (
        <div className={'main_print_body'}>
            <div className={'print_body'}>
                <div className={'print_details'}>{recordById && <RecordCheckPrint RecordDetails={recordById}/>}</div>
            </div>
        </div>

    );
};

export {GetRecordCheckPrint};