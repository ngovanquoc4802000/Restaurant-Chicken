import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/" className="blue">
        Go back to home page
      </Link>
    </div>
  );
}

export default NotFound;
