import {Outlet} from "react-router-dom";
import {Header} from "../components";
import React from "react";

const MainLayout = () => {

    return (
        <div className={'layout_div'}>
            <div>
                <Header/>
            </div>
            <div className={'content_div'}>
                <Outlet/>
            </div>
        </div>
    );
};

export {MainLayout};