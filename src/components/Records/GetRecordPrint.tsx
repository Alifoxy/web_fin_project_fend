import {FC, PropsWithChildren} from "react";
import {useAppSelector} from "../../hooks";
import {RecordPrint} from "./RecordPrint";

interface IProps extends PropsWithChildren {
}

const GetRecordPrint: FC<IProps> = () => {
    const {newRecord} = useAppSelector(state => state.new_record);

    return (
        <div className={'main_print_body'}>
            <div className={'print_body'}>
                <div className={'print_details'}>{newRecord && <RecordPrint newRecord={newRecord}/>}</div>
            </div>
        </div>

    );
};

export {GetRecordPrint};