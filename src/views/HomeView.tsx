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
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const [modal, setModal] = useState<boolean>(true);

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <>
            <UsernameModal />
            <ModalAuthComponent modal={modal} setModal={setModal} />
            <SideBar>
                <MainChatComponent />
            </SideBar>
        </>
    );
};

export default HomeView;