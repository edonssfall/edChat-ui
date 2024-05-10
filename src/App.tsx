import {AppProvider} from "./context/app.context.tsx";
import HomeView from "./views/HomeView.tsx";

/**
 * @name App
 * @constructor
 * @description Main application component
 */
function App() {
    return (
        <AppProvider>
            <HomeView/>
        </AppProvider>
    );
}

export default App;
