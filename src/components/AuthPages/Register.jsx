import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../../Contexts/AuthContext";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Register.module.css";

const AppName = import.meta.env.VITE_AppName;
const IMG_BB_KEY = import.meta.env.VITE_IMG_BB_KEY;

import Loader from "../Shared/Loader";
import toast from "react-hot-toast";

export default function Register() {
  //Executing Hooks
  const {
    authLoading,
    setAuthLoading,
    setActiveUser,
    registerHandler,
    googleLoginHandler,
    githubLoginHandler,
    updateUserProfile,
    requestToken,
    postUserOnMongo,
  } = useContext(userContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = `${AppName} || Register`;
    setLoading(false);
  }, []);

  // Event handlers --------------------------

  /* Register Form Submit Handler */
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    //Required Fields
    const email = form.email.value;
    const password = form.password.value;

    const displayName = form.displayName.value;

    let role = form.role.value;

    registerHandler(email, password)
      .then(async ({ user }) => {
        // Uploading Photo to IMG BB ------------
        const photoFile = new FormData();

        const file = form.photoFile.files[0];
        photoFile.append("image", file);

        const photoUpUrl = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
        const photoUpOptions = {
          method: "POST",
          body: photoFile,
        };

        let photoUpResult;
        try {
          const photoUpResponse = await fetch(photoUpUrl, photoUpOptions);
          photoUpResult = await photoUpResponse.json();
          if (!photoUpResult.success) {
            toast.error("Couldn't Upload Product Photo");
            setIsUploading(false);
            return;
          }
        } catch (error) {
          console.error(error);
          toast.error("Couldn't Upload Product Photo");
          setIsUploading(false);
        }
        const photoURL = photoUpResult.data.url;
        //------------------
        await postUserOnMongo(user, role, displayName, photoURL);
        await requestToken(user.uid);
        setActiveUser(user);
        toast.success("Successfully Registered New Account");

        const profileObj = { displayName, photoURL };
        if (displayName && photoURL) {
          setLoading(true);
          handleUpdate(profileObj);
        }
        if (location?.state?.from) {
          navigate(location?.state?.from, { replace: true });
          return;
        }
        if (location?.state?.prev) {
          navigate(location?.state?.prev, { replace: true });
          return;
        }
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("FAILED to Register");
        setAuthLoading(false);
        setError(error);
      });
  };
  // For adding displayName and photoURL
  const handleUpdate = (profileObj) => {
    updateUserProfile(profileObj)
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  };

  /* Google PopUp SignIn Handler */
  const handlerGoogleLogin = () => {
    googleLoginHandler()
      .then(async ({ user }) => {
        await postUserOnMongo(user, "buyer", user.displayName, user.photoURL);
        await requestToken(user.uid);
        toast.success("Successfully Registered New Account");
        setActiveUser(user);
        if (location?.state?.from) {
          navigate(location?.state?.from, { replace: true });
          return;
        }
        if (location?.state?.prev) {
          navigate(location?.state?.prev, { replace: true });
          return;
        }
      })
      .catch((error) => {
        toast.error("FAILED to Register");
        setAuthLoading(false);
        setError(error);
      });
  };

  /* Github PopUp SignIn Handler
  const handlerGithubLogin = () => {
    githubLoginHandler()
      .then(async ({ user }) => {
        await postUserOnMongo(user, "buyer", user.displayName, user.photoURL);
        await requestToken(user.uid);
        setActiveUser(user);
        toast.success("Successfully Registered New Account");
        if (location?.state?.from) {
          navigate(location?.state?.from, { replace: true });
          return;
        }
        if (location?.state?.prev) {
          navigate(location?.state?.prev, { replace: true });
          return;
        }
      })
      .catch((error) => {
        toast.error("FAILED to Register");
        setAuthLoading(false);
        setError(error);
      });
  }; 
	*/
  //--------------------------------------------

  if (authLoading || loading || isUploading) {
    return <Loader />;
  }

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={(e) => handleSubmit(e)} className="border rounded p-5">
        <h1 className="text-center">Register</h1>
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
        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="displayName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label>Select Role</Form.Label>
          <Form.Select aria-label="Default select example" name="role">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select Profile Picture</Form.Label>
          <Form.Control type="file" name="photoFile" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <p>
            Already have an account? Please,{" "}
            <Link to="/login" state={{ from: location?.state?.from }} replace>
              Login
            </Link>
          </p>
          {error ? (
            <p style={{ color: "red" }}>"Something Went Wrong. Try again"</p>
          ) : (
            ""
          )}
        </Form.Group>
        <button className="border btnPrimary" type="submit">
          Submit
        </button>
      </Form>
      <hr />
      <h1 className="text-center">Continue using</h1>
      <div className="d-flex justify-content-center">
        <button onClick={handlerGoogleLogin} className="border btnPrimary">
          {" "}
          <FontAwesomeIcon icon={faGoogle} /> Google{" "}
        </button>
      </div>
    </div>
  );
}
