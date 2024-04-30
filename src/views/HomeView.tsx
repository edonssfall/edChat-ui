import SideBar from "../components/nav/SideBarComponentComponent.tsx";
import MainChatComponent from "../components/HomeComponent.tsx";
import {useAppSelector} from "../store/hooks.ts";
import React, {useEffect} from "react";

/**
 * @name HomeView
 * @description View: HomeView page
 */
const HomeView: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <>
            <SideBar>
                <MainChatComponent />
            </SideBar>
        </>
    );
};

export default HomeView;