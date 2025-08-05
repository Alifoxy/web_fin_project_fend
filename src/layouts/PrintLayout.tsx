import {Outlet} from "react-router-dom";
import React from "react";

const PrintLayout = () => {

    return (
        <div className={'layout_div'}>
            <div className={'content_div'}>
                <Outlet/>
            </div>
        </div>
    );
};

export {PrintLayout};