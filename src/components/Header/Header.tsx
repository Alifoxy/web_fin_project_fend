import {NavLink} from "react-router-dom";
import '../Styles/Header.css';
import React from "react";

const Header = () => {
    return (
            <div>
                <div className={'header'}>
                    <div className={'logo'}><h1>FixTech</h1></div>
                    <div className={'header_links'}>
                        <div className={'header_link dropdown'}>
                            <div className={'dropdown_label'}>Квитанції </div>
                            <div className={'dropdown_content'}>
                                <div className={'dropdown_option'}>
                                    <NavLink to={'records/1'}>Всі</NavLink>
                                </div>
                                <div className={'dropdown_option'}>
                                    <NavLink to={'records_create'}>Створити</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={'head'}>
                            <NavLink to={'clients'}>Клієнти</NavLink>
                </div>
                <div className={'head'}>
                    <NavLink to={'devices'}>Пристрої</NavLink>
                </div>
                        <div className={'head dropdown'}>
                            <div className={'dropdown_label'}>Статуси </div>
                            <div className={'dropdown_content'}>
                            <div className={'dropdown_option'}>
                                    <NavLink to={'statuses/1'}>Всі</NavLink>
                                </div>
                                <div className={'dropdown_option'}>
                                    <NavLink to={'statuses_create'}>Створити</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={'head dropdown'}>
                            <div className={'dropdown_label'}>Виробники </div>
                            <div className={'dropdown_content'}>
                                <div className={'dropdown_option'}>
                                    <NavLink to={'manufacturers/1'}>Всі</NavLink>
                                </div>
                                <div className={'dropdown_option'}>
                                    <NavLink to={'manufacturers_create'}>Створити</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'user'}>
                        <div>Welcome!</div>
                    </div>
                </div>
            </div>
    );
};

export {Header};