import useIsMobile from "@/Hooks/IsMobile";
import {MobilePageLayout, PageLayout, MobileContent} from "@global";
import { HomeContent } from "@home";

const Home = () => {
    const isMobile = useIsMobile();

    if(isMobile) {
        return <MobilePageLayout>
            <MobileContent />
        </MobilePageLayout>
    }

    return (
        <PageLayout>
            <HomeContent />
        </PageLayout>
    )
}

export default Home;