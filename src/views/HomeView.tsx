import ModalForgetPasswordComponent from "../components/auth/modalForgetPasswordComponent.tsx";
import ModalAuthComponent from "../components/auth/modalAuthComponent.tsx";
import UsernameModal from "../components/auth/UsernameModalComponent.tsx";
import SideBar from "../components/nav/SideBarComponentComponent.tsx";
import MainChatComponent from "../components/HomeComponent.tsx";
import {useAppSelector} from "../store/hooks.ts";
import React, {useEffect, useState} from "react";

/**
 * @name HomeView
 * @description View: HomeView page
 */
const HomeView: React.FC = () => {
    const user = useAppSelector(state => state.user),
        [modalAuth, setModalAuth] = useState<boolean>(true),
        [modalForgetPassword, setModalForgetPassword] = useState<boolean>(false);

    useEffect(() => {
        setModalAuth(!!user.username);
    }, [user, modalAuth]);

    return (
        <>
            <UsernameModal />
            <ModalForgetPasswordComponent modal={modalForgetPassword} setModal={setModalForgetPassword} />
            <ModalAuthComponent modal={modalAuth} setModal={setModalAuth} />
            <SideBar>
                <MainChatComponent />
            </SideBar>
        </>
    );
};

export default HomeView;
