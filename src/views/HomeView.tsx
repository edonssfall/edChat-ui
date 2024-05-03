import ModalForgetPasswordComponent from "../components/auth/modalForgetPasswordComponent.tsx";
import ModalAuthComponent from "../components/auth/modalAuthComponent.tsx";
import UsernameModal from "../components/auth/UsernameModalComponent.tsx";
import SideBar from "../components/nav/SideBarComponentComponent.tsx";
import MainChatComponent from "../components/HomeComponent.tsx";
import {useAppSelector} from "../store/hooks.ts";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

/**
 * @name HomeView
 * @description View: HomeView page
 */
const HomeView: React.FC = () => {
    const user = useAppSelector(state => state.user),
        {uidb64, token} = useParams(),
        [modalType, setModalType] = useState<'auth' | 'password' | null>(null);

    useEffect(() => {
        if (user.username) {
            setModalType(null);
        } else {
            setModalType('auth');
        }
    }, [user, modalType]);

    useState(() => {
        if (uidb64 && token) {
            setModalType('password');
        } else if (!user.username) {
            setModalType('auth');
        }
    })

    return (
        <>
            <UsernameModal/>
            <ModalForgetPasswordComponent modalType={modalType} setModalType={setModalType} token={token} uidb64={uidb64}/>
            <ModalAuthComponent modalType={modalType} setModalType={setModalType}/>
            <SideBar>
                <MainChatComponent/>
            </SideBar>
        </>
    );
};

export default HomeView;
