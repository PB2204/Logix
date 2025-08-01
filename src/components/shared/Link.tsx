
"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLoader } from "@/context/LoaderContext";
import { usePathname } from "next/navigation";
import React from "react";

type LinkProps = NextLinkProps & {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, onClick, ...props }, ref) => {
    const { showLoader } = useLoader();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // If the href is the same as the current path, don't trigger the loader.
      if (href.toString() === pathname) {
        if (onClick) onClick(e);
        return;
      }
      
      // If it's an external link or a hash link, let the browser handle it without a loader.
      const isExternal = href.toString().startsWith('http') || href.toString().startsWith('mailto:');
      const isHashLink = href.toString().startsWith('#');
      if (!isExternal && !isHashLink) {
        showLoader();
      }
      
      if (onClick) onClick(e);
    };

    return (
      <NextLink href={href} className={className} onClick={handleClick} {...props} ref={ref}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
