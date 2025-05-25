import {FC, ReactNode} from "react";
import {MobileNavigation} from "@components/Global";

interface PageLayoutProps {
    children: ReactNode;
}


const MobilePageLayout: FC<PageLayoutProps> = ({ children }) => {
    return (
        <div>
            <MobileNavigation />
            {children}
        </div>
    );
}

export default MobilePageLayout;

