import React from "react";
import { useIsMobile } from "@hooks/useIsMobile";

export default function Footer() {
  const isMobile = useIsMobile();

  // Mobile
  if (isMobile) {
    return <footer className="fixed bottom-0 w-full">Mobile Footer</footer>;
  }

  // Desktop
  return <footer>Footer</footer>;
}
