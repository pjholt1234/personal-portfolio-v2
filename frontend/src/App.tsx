import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Background } from "@global";
import { SiteNavigationProvider } from "./Hooks/useSiteNavigation";

const App = () => {
    return (
        <BrowserRouter>
            <SiteNavigationProvider>
                <Background />
                <AppRoutes />
            </SiteNavigationProvider>
        </BrowserRouter>
    );
};

export default App;