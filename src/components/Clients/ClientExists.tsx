import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createRecordActions, resetCR} from "../../store";

const ClientExists = () => {
    const {isNewError, isJoinError, isNewSuccess, isJoinSuccess, new_message, join_message, body } = useSelector((state:any) => state.new_record);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isNewSuccess) {
            console.log(`${new_message}`);
            navigate('success/new')
        }
        
        if (isJoinSuccess) {
            console.log(`${join_message}`);
            navigate('success/join')
        }

        if (isNewError) {
            console.log(`Error: ${new_message}`);
        }

        if (isJoinError) {
            console.log(`Error: ${join_message}`);
        }

        return () => {
            dispatch(resetCR());
        };
    }, [isNewSuccess, isJoinSuccess, isNewError, isJoinError, new_message, join_message, dispatch, navigate]);

    const createNew  = () => {
        console.log(body)
        // @ts-ignore
        dispatch(createRecordActions.createNew(body));
    };

    const joinOld = () => {
        // @ts-ignore
        dispatch(createRecordActions.joinOld(body));
    };

    return (
        <div className={'records'}>
            <div className={'title1 title4'}>
                <h2>Клієнт з таким номером телефону вже існує в базі. Ви можете видалити цього клієнта і створити нового або прив'язати квитанцію до існуючого клієнта!</h2>
            </div>

            <div className={'button_create_div'}>
                <div>
                    <button onClick={createNew}  className={'button1'}>Створити нового</button>
                </div>
                <div>
                    <button onClick={joinOld}  className={'button1'}>Прив'язати до існуючого</button>
                </div>
            </div>
        </div>
    );
};

export {ClientExists};