
"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface LoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    // Hide the loader whenever the pathname changes.
    // This assumes the new page will render quickly.
    const timer = setTimeout(() => {
        hideLoader();
    }, 500); // A small delay to allow the animation to be seen

    return () => clearTimeout(timer);
  }, [pathname, hideLoader]);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
