import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/Styles/MainStyle.css';
import './components/Styles/PrintStyle.css';
import './components/Styles/ButtonStyle.css';
import './components/Styles/RecordsStyle.css';
import './components/Styles/DevicesStyle.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {router} from "./router";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
// const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
                <div className={"outer_div"}>
                    <RouterProvider router={router}/>
                </div>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
