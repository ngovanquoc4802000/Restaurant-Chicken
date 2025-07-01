import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg mb-6">Page not found.</p>
      <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
        Return to home page
      </Link>
    </div>
  );
}

export default NotFound;
