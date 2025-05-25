import useIsMobile from "@/Hooks/IsMobile";
import {MobilePageLayout, PageLayout} from "@global";
import { HomeContent } from "@home";

const Home = () => {
    const isMobile = useIsMobile();
    console.log('isMobile', isMobile);

    if(isMobile) {
        return <MobilePageLayout />
    }


    return (
        <PageLayout>
            <HomeContent />
        </PageLayout>
    )
}

export default Home;