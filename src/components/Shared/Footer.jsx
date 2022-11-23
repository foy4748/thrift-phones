import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
const AppName = import.meta.env.VITE_AppName;

export default function FooterSection() {
  return (
    <>
      <div className={styles.footerContainer}>
        <footer className="page-footer font-small blue pt-4">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">{AppName}</h5>
                <p>
                  <strong>No Pain No Gain is an exception here</strong>
                </p>
              </div>

              <hr className="clearfix w-100 d-md-none pb-0" />

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Pages</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blogs</Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Socials</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="https://facebook.com/faisaljfcl">Facebook</a>
                  </li>
                  <li>
                    <a href="https://github.com/foy4748">Github</a>
                  </li>
                  <li>
                    <a href="http://discord.com/users/foy4748#3327">Discord</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://github.com/foy4748"> foy4748 </a>
          </div>
        </footer>
      </div>
    </>
  );
}
