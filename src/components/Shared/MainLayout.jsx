import NavBar from "./Navbar";
import FooterSection from "./Footer";

import { Toaster } from "react-hot-toast";

import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./MainLayout.module.css";

//For Context API purpose
import AuthContext from "../../Contexts/AuthContext";

export default function MainLayout() {
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
      <AuthContext>
        <NavBar darkActive={darkActive} setDarkActive={setDarkActive} />
        <Toaster />
        <section
          className={`${styles.mainContainer} ${
            darkActive ? styles.darkTheme : ""
          } `}
        >
          <Outlet />
        </section>
        <FooterSection />
      </AuthContext>
    </>
  );
}
