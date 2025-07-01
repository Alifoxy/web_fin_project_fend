import {Outlet} from "react-router-dom";
import {Header} from "../components";
import React from "react";

const MainLayout = () => {

    return (
        <div className={'layout_div'}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};