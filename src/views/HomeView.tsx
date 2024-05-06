import SideBar from '../components/nav/SideBar/SideBarComponentComponent.tsx';
import MainChatComponent from '../components/HomeComponent.tsx';
import ModalView from './ModalView.tsx';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

/**
 * @name HomeView
 * @description View: HomeView page
 */
function HomeView(): React.JSX.Element {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/chats/:uidb64?/:token?'} element={
                        <>
                            <ModalView/>
                            <SideBar>
                                <MainChatComponent/>
                            </SideBar>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default HomeView;
