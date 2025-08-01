"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const BackgroundGlow = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <div className="background-glow">
            <div className="glow-blob glow-blob-1"></div>
            <div className="glow-blob glow-blob-2"></div>
            <div className="glow-blob glow-blob-3"></div>
        </div>
    )
}
