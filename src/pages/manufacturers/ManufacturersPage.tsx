import {
    Manufacturers,
} from "../../components";
import React from "react";

const ManufacturersPage = () => {

    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Виробники</h2>
                <Manufacturers/>
            </div>
        </div>
    );
};

export {ManufacturersPage};