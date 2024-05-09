import HomeView from "./views/HomeView.tsx";
import {WebSocketProvider} from "./services/websocket.context.tsx";
import {ModalTypeProvider} from "./services/modal.context.tsx";

function App() {
    return (
        <WebSocketProvider>
            <ModalTypeProvider>
                <HomeView />
            </ModalTypeProvider>
        </WebSocketProvider>
    );
}

export default App;
