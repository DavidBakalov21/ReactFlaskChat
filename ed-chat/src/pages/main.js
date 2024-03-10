import "../styles/main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="container">
      <h1>Welcome to Our Site!</h1>
      <p className="lead">The best place to learn and share knowledge.</p>
      <div>
        <Link className="links" to="/signin">
          Sign in
        </Link>
        <Link className="links" to="/info">
          Info
        </Link>
        <Link className="links" to="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
export default Main;
