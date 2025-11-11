// file to create the component for the about page

// importing the required files for the page
import React from "react";
import Navbar from "../navbar/Navbar";

const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <h1 className="text-2xl ml-[500px]">This is about Code Sage</h1>
      </div>
    </div>
  );
};

export default About;
