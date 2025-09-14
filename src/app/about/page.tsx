
"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn more about our mission, team, and values.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              Our mission is to provide a comprehensive and immersive platform
              for exploring the rich cultural heritage of Sikkim's monasteries.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Our Team</h2>
            <p className="mt-4 text-gray-600">
              We are a passionate team of developers, designers, and cultural
              enthusiasts dedicated to preserving and promoting Sikkim's unique
              heritage.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
            <p className="mt-4 text-gray-600">
              We believe in authenticity, respect, and innovation. We are
              committed to creating a platform that is both informative and
              engaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
