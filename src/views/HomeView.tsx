import SideBar from '../components/nav/SideBar/SideBarComponentComponent.tsx';
import MainChatComponent from '../components/chat/MainChatComponent.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthView from './AuthView.tsx';
import React, {useEffect} from 'react';
import {useAppSelector} from "../store/hooks.ts";
import NotificationComponent from "../components/NotificationComponent.tsx";

/**
 * @name HomeView
 * @description View: HomeView page
 */
function HomeView(): React.JSX.Element {
    const user = useAppSelector(state => state.user);

    useEffect(() => {

    }, [user]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/chats/:uidb64?/:token?'} element={
                        <>
                            <AuthView/>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>
            <SideBar>
                <MainChatComponent/>
            </SideBar>
            {user.username ? <NotificationComponent/> : null}
        </>
    );
}

export default HomeView;
