import PageLayout from "@components/shared-ui/PageLayout/PageLayout.tsx";
import LeftContent from "@components/home/LeftContent/LeftContent";
import RightContent from "@components/home/RightContent/RightContent";
import {PanelProvider} from "@/hooks/PanelContext";

const Home = () => {
    return (
        <PanelProvider>
            <PageLayout leftContent={<LeftContent />} rightContent={<RightContent />} />
        </PanelProvider>
    );
}

export default Home;