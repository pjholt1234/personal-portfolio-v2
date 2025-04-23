import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Background } from "@global";

const App = () => {
    return (
        <BrowserRouter>
            <Background />
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;