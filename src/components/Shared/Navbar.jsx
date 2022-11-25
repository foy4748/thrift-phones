//import styles from "./Navbar.module.css";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import useGetCategories from "../../Hooks/useGetCategories";
import useCheckRole from "../../Hooks/useCheckRole";

const AppName = import.meta.env.VITE_AppName;

import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

import { userContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

import { getAuth } from "firebase/auth";
import firebaseApp from "../../firebase.config.js";

const auth = getAuth(firebaseApp);

export default function NavBar({ darkActive, setDarkActive }) {
  // Executing Hooks
  const { setActiveUser, logOutHandler, authLoading } = useContext(userContext);
  const [categories, setCategories] = useGetCategories();
  const location = useLocation();
  const navigate = useNavigate();

  const activeUser = auth.currentUser;
  const [sellerRole, sellerRoleLoading] = useCheckRole(
    activeUser?.uid,
    "seller"
  );
  const [adminRole, adminRoleLoading] = useCheckRole(activeUser?.uid, "admin");
  //--------------------------------------

  // Event Handlers
  const toggleButton = useRef();
  const closeMenu = () => {
    if (toggleButton.current.nextSibling.classList.contains("show"))
      toggleButton.current.click();
  };

  const handleLogOut = () => {
    logOutHandler()
      .then(() => {
        window.localStorage.clear("authtoken");
        setActiveUser(null);
        toast.success("Successfully Logged Out");
        navigate("/");
      })
      .catch((error) => {
        toast.error("FAILED to Log Out");
        console.error(error);
      });
  };
  //--------------------------------------

  // Auth related JSX for conditional rendering
  const logoutNavItem = () => {
    return (
      <>
        <Nav.Link onClick={handleLogOut}>
          {" "}
          {activeUser?.email || "Log Out"}
        </Nav.Link>

        <OverlayTrigger
          placement={"bottom"}
          overlay={<Tooltip>{activeUser.displayName}</Tooltip>}
        >
          <Nav.Link onClick={handleLogOut}>
            {" "}
            {activeUser?.photoURL && (
              <Image
                className="userIcon"
                src={activeUser.photoURL}
                alt={activeUser.displayName}
                referrerPolicy="no-referrer"
              />
            )}
          </Nav.Link>
        </OverlayTrigger>
      </>
    );
  };

  const loginRegisterNavItem = () => {
    return (
      <>
        <Nav.Link
          as={NavLink}
          onClick={closeMenu}
          to="/register"
          state={{ from: location?.state?.from, prev: location }}
          replace
        >
          Register
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          onClick={closeMenu}
          to="/login"
          state={{ from: location?.state?.from, prev: location }}
          replace
        >
          Login
        </Nav.Link>
      </>
    );
  };

  // Role Based Routes
  const privateNavItems = () => {
    if (adminRoleLoading || sellerRoleLoading) {
      return (
        <>
          <NavDropdown.Item as={Link} to="/" onClick={closeMenu}>
            Loading...
          </NavDropdown.Item>
        </>
      );
    }

    if (!adminRole && !sellerRole) {
      return (
        <>
          <NavDropdown.Item as={Link} to="/my-orders" onClick={closeMenu}>
            My Orders
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/my-wishlist" onClick={closeMenu}>
            My Wish List
          </NavDropdown.Item>
        </>
      );
    }

    if (adminRole) {
      return (
        <>
          <NavDropdown.Item as={Link} to="/all-buyers" onClick={closeMenu}>
            All Buyers
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/all-sellers" onClick={closeMenu}>
            All Sellers
          </NavDropdown.Item>
        </>
      );
    }

    if (sellerRole) {
      return (
        <>
          <NavDropdown.Item as={Link} to="/add-product" onClick={closeMenu}>
            Add a product
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/my-products" onClick={closeMenu}>
            My Products
          </NavDropdown.Item>
        </>
      );
    }
  };
  //-------------------------

  // Light & Dark Theme Switch JSX
  const light = (
    <OverlayTrigger
      placement={"bottom"}
      overlay={<Tooltip>Light Theme</Tooltip>}
    >
      <Nav.Item onClick={() => setDarkActive((curr) => !curr)}>
        {" "}
        <Nav.Link>
          {" "}
          <FontAwesomeIcon icon={faSun} />{" "}
        </Nav.Link>{" "}
      </Nav.Item>
    </OverlayTrigger>
  );
  const dark = (
    <OverlayTrigger
      placement={"bottom"}
      overlay={<Tooltip>Dark Theme</Tooltip>}
    >
      <Nav.Item onClick={() => setDarkActive((curr) => !curr)}>
        {" "}
        <Nav.Link>
          {" "}
          <FontAwesomeIcon icon={faMoon} />{" "}
        </Nav.Link>{" "}
      </Nav.Item>
    </OverlayTrigger>
  );
  //-------------------------------

  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              className="brandLogo"
              src="/favicon.svg"
              alt={`${AppName} logo`}
            />
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/">
            {AppName}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            ref={toggleButton}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Category" id="category-nav-dropdown">
                {categories.length &&
                  categories.map(({ _id, category_name }) => (
                    <NavDropdown.Item
                      as={Link}
                      to={`category/${_id}`}
                      key={_id}
                    >
                      {category_name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              {activeUser && activeUser?.uid && (
                <NavDropdown title="Dashboard" id="dashboard-nav-dropdown">
                  {privateNavItems()}
                </NavDropdown>
              )}
              <Nav.Link as={NavLink} onClick={closeMenu} to="/blogs">
                Blogs
              </Nav.Link>
            </Nav>
            <Nav>
              {activeUser && activeUser?.uid && (
                <>
                  <Nav.Link
                    onClick={() => {
                      closeMenu();
                      handleLogOut();
                    }}
                    to="#"
                  >
                    Log Out
                  </Nav.Link>
                </>
              )}
              {darkActive ? dark : light}
              {activeUser && activeUser?.uid ? (
                logoutNavItem()
              ) : authLoading ? (
                <>
                  {loginRegisterNavItem()}
                  <Nav.Link as={NavLink} to="/login">
                    {" "}
                    Loading..{" "}
                  </Nav.Link>
                </>
              ) : (
                loginRegisterNavItem()
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
