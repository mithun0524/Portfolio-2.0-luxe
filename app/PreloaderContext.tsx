"use client";

import { createContext, useContext, useState } from "react";

interface PreloaderContextType {
    isPreloaderComplete: boolean;
    setPreloaderComplete: (complete: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
    undefined
);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

    return (
        <PreloaderContext.Provider
            value={{
                isPreloaderComplete,
                setPreloaderComplete: setIsPreloaderComplete,
            }}
        >
            {children}
        </PreloaderContext.Provider>
    );
}

export function usePreloader() {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error("usePreloader must be used within PreloaderProvider");
    }
    return context;
}
