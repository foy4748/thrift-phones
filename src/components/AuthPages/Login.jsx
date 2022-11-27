import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../../Contexts/AuthContext";
import { Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

import toast from "react-hot-toast";

import styles from "./Register.module.css";

import Loader from "../Shared/Loader";

const AppName = import.meta.env.VITE_AppName;

export default function Login() {
  //Executing Hooks
  const {
    authLoading,
    setAuthLoading,
    setActiveUser,
    loginHandler,
    googleLoginHandler,
    githubLoginHandler,
    checkUserOnMongo,
  } = useContext(userContext);

  const [error, setError] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.document.title = `${AppName} || Login`;
    setLoading(false);
  }, []);

  // Event handlers --------------------------

  /* Login Form Submit Handler */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginHandler(email, password)
      .then(async ({ user }) => {
        const userStatus = await checkUserOnMongo(user.uid);
        if (!userStatus) {
          setActiveUser(null);
          return;
        }
        setActiveUser(user);
        form.reset();
        toast.success("Successfully Logged In");
        navigate(location?.state?.from || location?.state?.prev || "/", {
          replace: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("FAILED to Login");
        setError(error.message);
        setAuthLoading(false);
      });
  };

  /* Google PopUp SignIn Handler */
  const handlerGoogleLogin = () => {
    googleLoginHandler()
      .then(async ({ user }) => {
        const userStatus = await checkUserOnMongo(user.uid);
        if (!userStatus) {
          return;
        }
        setActiveUser(user);
        toast.success("Successfully Logged In");
        navigate(location?.state?.from || location?.state?.prev || "/", {
          replace: true,
        });
      })
      .catch((error) => {
        setError(error);
        toast.error("FAILED to Login");
        setAuthLoading(false);
      });
  };

  /* Github PopUp SignIn Handler */
  const handlerGithubLogin = () => {
    githubLoginHandler()
      .then(async ({ user }) => {
        const userStatus = await checkUserOnMongo(user.uid);
        if (!userStatus) {
          return;
        }
        setActiveUser(user);
        toast.success("Successfully Logged In");
        navigate(location?.state?.from || location?.state?.prev || "/", {
          replace: true,
        });
      })
      .catch((error) => {
        setError(error);
        toast.error("FAILED to Login");
        setAuthLoading(false);
      });
  };
  //--------------------------------------------

  if (authLoading || loading) {
    return <Loader />;
  }

  return (
    <div className={styles.formContainer}>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        onChange={() => setError(false)}
        className="border rounded p-5"
      >
        <h1 className="text-center">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <p>
            Don't have an account? Please,{" "}
            <Link
              to="/register"
              state={{ from: location?.state?.from }}
              replace
            >
              Register
            </Link>
          </p>
          {error ? <p style={{ color: "red" }}>"Wrong email/password"</p> : ""}
        </Form.Group>
        <button className="border btnPrimary" type="submit">
          Submit
        </button>
      </Form>
      <hr />
      <h1 className="text-center">Continue using</h1>
      <div className="d-flex justify-content-center">
        <button
          onClick={handlerGoogleLogin}
          className="border btnPrimary"
          type="submit"
        >
          {" "}
          <FontAwesomeIcon icon={faGoogle} /> Google{" "}
        </button>
      </div>
    </div>
  );
}

/*
 
        <button
          onClick={handlerGithubLogin}
          className="border btnPrimary"
          type="submit"
        >
          {" "}
          <FontAwesomeIcon icon={faGithub} /> Github{" "}
        </button>
*/
