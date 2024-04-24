import { openUsername } from "./store/slices/modal.slice.ts";
import SideBar from "./components/nav/SideBar.tsx";
import { useAppSelector } from "./store/hooks.ts";
import Home from "./components/Home.tsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn),
        usernameModal = useAppSelector(state => state.modal.username),
        dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(openUsername())
        }
    }, [usernameModal, isLoggedIn]);

    return (
        <SideBar>
            <Home />
        </SideBar>
    );
}

export default App;
