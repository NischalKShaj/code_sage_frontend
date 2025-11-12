// file to create the footer for the application

// importing the required modules
import Link from "next/link";
import * as React from "react";

const Footer = () => {
  return (
    <div>
      <section className="py-20 bg-blue-100 text-black text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to Level Up Your Code?
        </h2>
        <p className="text-black mt-3 text-lg">
          Sign up now and experience the future of AI-assisted code reviews.
        </p>
        <Link
          href="/signup"
          className="inline-block mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-200 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Code Sage — All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
