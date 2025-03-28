import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PanelContextType {
    currentPanel: string;
    setCurrentPanel: (panel: string) => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

interface PanelProviderProps {
    children: ReactNode;
}

export const PanelProvider: React.FC<PanelProviderProps> = ({ children }) => {
    const getInitialPanel = (): string => {
        const params = new URLSearchParams(window.location.search);
        return params.get("panel") || "home";
    };

    const [currentPanel, setCurrentPanel] = useState<string>(getInitialPanel);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set("panel", currentPanel);
        window.history.replaceState(null, "", `?${params.toString()}`);
    }, [currentPanel]);

    return (
        <PanelContext.Provider value={{ currentPanel, setCurrentPanel }}>
            {children}
        </PanelContext.Provider>
    );
};

export const usePanel = (): PanelContextType => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error("usePanel must be used within a PanelProvider");
    }
    return context;
};