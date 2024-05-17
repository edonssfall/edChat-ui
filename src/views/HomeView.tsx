import SideBar from '../components/nav/SideBar/SideBarComponentComponent.tsx';
import NotificationComponent from '../components/NotificationComponent.tsx';
import MainChatComponent from '../components/chat/MainChatComponent.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useProfile} from '../services/user.service.ts';
import AuthView from './AuthView.tsx';
import React from 'react';

/**
 * @name HomeView
 * @description View: HomeView page
 */
function HomeView(): React.JSX.Element {
  const {profile} = useProfile();

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
      {profile.username ? <NotificationComponent/> : null}
    </>
  );
}

export default HomeView;
