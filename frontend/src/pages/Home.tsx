import PageLayout from "@components/shared-ui/PageLayout/PageLayout.tsx";
import LeftContent from "@components/home/LeftContent/LeftContent";
import RightContent from "@components/home/RightContent/RightContent";

const Home = () => {
    return <PageLayout leftContent={<LeftContent />} rightContent={<RightContent />} />;
}

export default Home;