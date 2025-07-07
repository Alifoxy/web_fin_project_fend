import {Records, RecordsPageForm} from "../../components";
import React from "react";

const RecordsPage = () => {
    return (
            <div className={'record_page'}>
                <h2 className={'title1'}>Квитанції</h2>
                <RecordsPageForm/>
                <Records/>
            </div>
    );
};

export {RecordsPage};