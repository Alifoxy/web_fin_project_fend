import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {create_deleteStatusActions, resetSt} from "../../store/slices/create_deleteStatusSlice";

interface IProps extends PropsWithChildren {
}

const StatusCreateForm: FC<IProps> = () => {
    const {
        newStatus,
        isStLoading,
        isStError,
        isStSuccess,
        message
    } = useSelector((state: any) => state.create_delete_statuses);
    const [, setIsRMChecked] = useState(false);
    const [, setIsSDChecked] = useState(false);
    const [, setIsRRChecked] = useState(false);
    const [, setIsSFChecked] = useState(false);
    const [sd, setSD] = useState(false);
    const [sm, setSM] = useState(false);
    const [rr, setRR] = useState(false);
    const [sf, setSF] = useState(false);
    const [st, setST] = useState('');

    const [body, setBody] = useState({status: '', manufacturer_required: false, is_default: false, is_final:false, is_return_ready:false})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setST(val)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(body)
        // @ts-ignore
        dispatch(create_deleteStatusActions.createStatus(body));
    };

    const handleSMCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsRMChecked(checked)
        if (checked) {
            setSM(checked)
        } else {
            setSM(false)
        }
    };

    const handleSDCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsSDChecked(checked)
        if (checked) {
            setSD(checked)
        } else {
            setSD(false)
        }
    };

    const handleRRCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsRRChecked(checked)
        if (checked) {
            setRR(checked)
        } else {
            setRR(false)
        }
    };

    const handleSFCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = (event.target.checked)
        setIsSFChecked(checked)
        if (checked) {
            setSF(checked)
        } else {
            setSF(false)
        }
    };

    useEffect(() => {
        setBody({status: st, manufacturer_required: sm, is_default: sd, is_final: sf, is_return_ready:rr})

        const redirectToSuccess = () => {
            navigate('success')
        }

        if (isStError  && message === 'Request failed with status code 409') {
            navigate('error_params_conflict')
            alert(`Error: ${message}`);
        }

        if (isStError  && message === 'Request failed with status code 400') {
            navigate('error_exists')
            alert(`Error: ${message}`);
        }

        if (isStSuccess && newStatus) {
            redirectToSuccess()
        }

        return () => {
            dispatch(resetSt());
        };
    }, [message, dispatch, newStatus, body.status, isStError, isStSuccess, navigate, sd, st, sm, sf, rr]);

    return (
        <div className={'records'}>
            <form onSubmit={handleSubmit}>
                <div className={'create_div'}>
                    <div>
                        <div className={'title2'}>Створити новий статус</div>
                        <input type="text" placeholder={"статус"} name="name" value={body.status}
                               onChange={handleStatusChange} className={'input'} required={true}/>
                    </div>
                    <div className={'check_div'}>
                        <div>
                            <input
                                className={'check_input'}
                                type="checkbox"
                                checked={sm}
                                onChange={handleSMCheckboxChange}
                            />
                        </div>
                        <h3 className={'title4'}>Вказувати виробника</h3>
                    </div>
                    <div className={'check_div'}>
                        <div>
                            <input
                                className={'check_input'}
                                type="checkbox"
                                checked={sd}
                                onChange={handleSDCheckboxChange}
                            />
                        </div>
                        <h3 className={'title4'}>Базовий статус</h3>
                    </div>
                    <div className={'check_div'}>
                        <div>
                            <input
                                className={'check_input'}
                                type="checkbox"
                                checked={rr}
                                onChange={handleRRCheckboxChange}
                            />
                        </div>
                        <h3 className={'title4'}>Статус готовності до видачі</h3>
                    </div>
                    <div className={'check_div'}>
                        <div>
                            <input
                                className={'check_input'}
                                type="checkbox"
                                checked={sf}
                                onChange={handleSFCheckboxChange}
                            />
                        </div>
                        <h3 className={'title4'}>Фінальний статус</h3>
                    </div>
                </div>
                <div className={'button_create_div'}>
                    <button type="submit" onSubmit={handleSubmit} disabled={isStLoading || !body.status}
                            className={'button1'}>Створити
                    </button>
                </div>
            </form>
        </div>
    )
};

export {StatusCreateForm}