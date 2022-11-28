import NavBar from "./Navbar";
import FooterSection from "./Footer";

import { Toaster } from "react-hot-toast";

import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./MainLayout.module.css";

import DashboardNavLinks from "../DashboardPages/DashboardNavLinks";
export default function DashboardLayout() {
  const [darkActive, setDarkActive] = useState(false);

  // For scrolling to top
  // When page changes !!
  // https://stackoverflow.com/questions/58598637/why-react-new-page-render-from-the-bottom-of-the-screen
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <>
      <NavBar darkActive={darkActive} setDarkActive={setDarkActive} />
      <Toaster />
      <section
        className={`${styles.mainContainer} ${
          darkActive ? styles.darkTheme : ""
        } `}
      >
        <DashboardNavLinks />
        <Outlet />
      </section>
      <FooterSection />
    </>
  );
}
