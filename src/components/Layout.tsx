import { useBlog } from "@/context/BlogContext";
import type { ChildrenProps } from "@/interface";
import { useEffect, useState } from "react";

const Layout = ({ children }: ChildrenProps) => {
  const [screenSize, setScreenSize] = useState<number | null>(null);
  const { setSidebarOpen, setLoader } = useBlog();

  const checkWidth = () => {
    let windowWidth = null;
    if (typeof window !== "undefined") {
      windowWidth = window?.innerWidth;
      setScreenSize(windowWidth);
    }
    if (windowWidth) {
      if (windowWidth <= 850) setSidebarOpen(true);
      if (windowWidth > 850) setSidebarOpen(false);
      return windowWidth;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, [setLoader]);

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
    // eslint-disable-next-line
  }, [screenSize]);

  return (
    <div>
      <div className="layout mt-5 pt-5 mx-1">{children}</div>
    </div>
  );
};

export default Layout;
