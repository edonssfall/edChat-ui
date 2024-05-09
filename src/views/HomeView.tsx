import SideBar from '../components/nav/SideBar/SideBarComponentComponent.tsx';
import MainChatComponent from '../components/chat/MainChatComponent.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthView from './AuthView.tsx';
import React from 'react';

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
                            <AuthView/>
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
