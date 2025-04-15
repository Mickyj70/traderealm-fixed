import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-deepViolet text-lavender">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-xl">Page Not Found</p>
      <p className="mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-white transition-all rounded-lg bg-neonPurple hover:bg-opacity-80"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
