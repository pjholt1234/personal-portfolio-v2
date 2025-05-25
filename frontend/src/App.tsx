import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Background } from "@global";
import { SiteNavigationProvider } from "./Hooks/useSiteNavigation";

const App = () => {
    return (
        <SiteNavigationProvider>
            <BrowserRouter>
                <Background />
                <AppRoutes />
            </BrowserRouter>
        </SiteNavigationProvider>
    );
};

export default App;