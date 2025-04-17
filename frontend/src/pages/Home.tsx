import { LeftContent, RightContent, PageLayout } from "@global";
import { PanelProvider } from "@/hooks/PanelContext";

const Home = () => {
    return (
        <PanelProvider>
            <PageLayout leftContent={<LeftContent />} rightContent={<RightContent />} />
        </PanelProvider>
    );
}

export default Home;