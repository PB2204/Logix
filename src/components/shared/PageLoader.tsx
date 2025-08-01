
"use client";

import { useLoader } from "@/context/LoaderContext";
import { cn } from "@/lib/utils";

export default function PageLoader() {
  const { isLoading } = useLoader();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex pointer-events-none transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        style={{ animationDelay: '0.1s' }}
        className="page-loader-bar h-full w-1/4 bg-gradient-to-t from-primary/80 to-primary"
      />
      <div
        style={{ animationDelay: '0.2s' }}
        className="page-loader-bar h-full w-1/4 bg-gradient-to-t from-accent/80 to-accent"
      />
      <div
        style={{ animationDelay: '0.3s' }}
        className="page-loader-bar h-full w-1/4 bg-gradient-to-t from-primary/80 to-primary"
      />
      <div
        style={{ animationDelay: '0.4s' }}
        className="page-loader-bar h-full w-1/4 bg-gradient-to-t from-accent/80 to-accent"
      />
    </div>
  );
}
