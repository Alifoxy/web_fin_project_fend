import {
    ManufacturerCreateForm,
} from "../../components";
import React from "react";
import {Outlet} from "react-router-dom";

const ManufacturersCreatePage = () => {

    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Створити нового виробника</h2>
                <ManufacturerCreateForm/>
                <Outlet/>
            </div>
        </div>
    );
};

export {ManufacturersCreatePage};