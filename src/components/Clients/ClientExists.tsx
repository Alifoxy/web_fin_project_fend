import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createNewActions, resetNew} from "../../store/slices/createNewSlice";
import {joinOldActions, resetJoin} from "../../store/slices/joinOldSlice";

// @ts-ignore
const ClientExists = () => {
    const {isNewLoading, isNewError, isNewSuccess, new_message } = useSelector((state:any) => state.new_new_record);
    const {isJoinLoading, isJoinError, isJoinSuccess, join_message } = useSelector((state:any) => state.join_old_record);
    const body = useSelector((state:any) => state.new_record.body);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const redirectToSuccessNew = () => {
            navigate('success/new')
        }

        const redirectToSuccessJoin = () => {
            navigate('success/join')
        }

        if (isNewSuccess) {
            console.log(`${new_message}`);
            redirectToSuccessNew()
            // Reset the state after successful creation
        }
        
        if (isJoinSuccess) {
            console.log(`${join_message}`);
            redirectToSuccessJoin()
            // Reset the state after successful creation
        }

        if (isNewError||isJoinError) {
            console.log(`Error: ${new_message}`);
            // Reset the state after an error
        }

        return () => {
            dispatch(resetNew());
            dispatch(resetJoin());
        };
    }, [isNewSuccess, isJoinSuccess, isNewError, isJoinError, new_message, join_message, dispatch]);


    // const createNew: SubmitHandler<any> = () => {
    //     console.log(body)
    //     // @ts-ignore
    //     dispatch(createNewActions.createNew(body));
    //
    //
    // };

    const createNew  = () => {
        console.log(body)
        // @ts-ignore
        dispatch(createNewActions.createNew(body));


    };

    // const joinOld: SubmitHandler<any> = () => {
    //     // @ts-ignore
    //     dispatch(joinOldActions.joinOld(body));
    //
    //
    // };
    //
    const joinOld = () => {
        // @ts-ignore
        dispatch(joinOldActions.joinOld(body));


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