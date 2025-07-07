import React, {FC, PropsWithChildren, useState} from "react";
import {IStatus} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {create_deleteStatusActions} from "../../store/slices/create_deleteStatusSlice";
import {resetStP, statusesParamsActions} from "../../store";

interface IProps extends PropsWithChildren {
    SetStatus:IStatus
}

const Status: FC<IProps> = ({SetStatus}) => {

    const {id:s_id, status:st, created, manufacturer_required:m_rec, is_default, is_final, is_return_ready} = SetStatus;
    const [, setIsRMChecked] = useState(false);
    const [, setIsSDChecked] = useState(false);
    const [, setIsSFChecked] = useState(false);
    const [, setIsRRChecked] = useState(false);
    const dispatch = useAppDispatch();

    const handleSMCheckboxChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsRMChecked(checked)
        if (checked) {
             const body = {manufacturer_required: checked}
            console.log(body)
            dispatch(statusesParamsActions.setManufacturerRequired({id: s_id, body }));
            dispatch(resetStP())
        }else{
            const body = {manufacturer_required: false}
            console.log(body)
            dispatch(statusesParamsActions.setManufacturerRequired( {id: s_id, body}));
            dispatch(resetStP())
        }
    }

    const handleSDCheckboxChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsSDChecked(checked)
        if (checked) {
            const body = {is_default: checked}
            console.log(body)
            dispatch(statusesParamsActions.setDefaultStatus({id: s_id, body }));
            dispatch(resetStP())
        }else{
            const body = {is_default: false}
            console.log(body)
            dispatch(statusesParamsActions.setDefaultStatus( {id: s_id, body}));
            dispatch(resetStP())
        }
    };

    const handleRRCheckboxChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsRRChecked(checked)
        if (checked) {
            const body = {is_return_ready: checked}
            console.log(body)
            dispatch(statusesParamsActions.setReturnReadyStatus({id: s_id, body }));
            dispatch(resetStP())

        }else{
            const body = {is_return_ready: false}
            console.log(body)
            dispatch(statusesParamsActions.setReturnReadyStatus( {id: s_id, body}));
            dispatch(resetStP())

        }
    };

    const handleSFCheckboxChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsSFChecked(checked)
        if (checked) {
            const body = {is_final: checked}
            console.log(body)
            dispatch(statusesParamsActions.setFinalStatus({id: s_id, body }));
            dispatch(resetStP())

        }else{
            const body = {is_final: false}
            console.log(body)
            dispatch(statusesParamsActions.setFinalStatus( {id: s_id, body}));
            dispatch(resetStP())
        }
    };

    const DeleteS = async () => {
        await dispatch(create_deleteStatusActions.deleteStatus({id: s_id}))
        dispatch(resetStP())
    }

    return (
        <div className={'record'}>
            <div className={'table_item'}>{st}</div>
            <div className={'table_item'}>{created}</div>
                <div className={'table_item2'}>
                    <div>
                        <input
                            className={'check_input'}
                            type="checkbox"
                            checked={m_rec}
                            onChange={handleSMCheckboxChange}
                        />
                    </div>
                </div>
                <div className={'table_item2'}>
                    <div>
                        <input
                            className={'check_input'}
                            type="checkbox"
                            checked={is_default}
                            onChange={handleSDCheckboxChange}
                        />
                    </div>
                </div>
                <div className={'table_item2'}>
                    <div>
                        <input
                            className={'check_input'}
                            type="checkbox"
                            checked={is_return_ready}
                            onChange={handleRRCheckboxChange}
                        />
                    </div>
                </div>
                <div className={'table_item2'}>
                    <div>
                        <input
                            className={'check_input'}
                            type="checkbox"
                            checked={is_final}
                            onChange={handleSFCheckboxChange}
                        />
                    </div>
                </div>
            <button className={'delete_button'} onClick={DeleteS}>X</button>
        </div>
    );
};

export {Status}