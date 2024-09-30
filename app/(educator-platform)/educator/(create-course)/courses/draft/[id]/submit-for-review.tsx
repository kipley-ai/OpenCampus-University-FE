'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PricingWarning from "components/icon/pricing-warning.svg";

const SubmitForReview = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courseURL, setCourseURL] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the course
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Congratulations on finishing your course!</h2>
        <p className="mb-6">
          You are just one step away from having your course published on Open Campus. You have successfully
          submitted your course for review. Our team will review your course in the next 2 business days, and get back to
          you. You submitted your course for review on {new Date().toLocaleDateString()}.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Submit for Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="courseURL" className="block font-semibold mb-2">Course URL</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              http://www.opencampus.com/course/
            </span>
            <input
              type="text"
              id="courseURL"
              className="rounded-none rounded-r-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 font-bold"
              value={courseURL}
              onChange={(e) => setCourseURL(e.target.value)}
              placeholder="learn-java-from-scratch"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Course URL should be between 8 and 70 characters and not a number</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Image src={PricingWarning} alt="Pricing Warning" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-black">
                <span className="font-bold">Warning:</span> Once you set your course URL it CANNOT BE CHANGED
              </p>
              <p className="text-sm text-blue-700 mt-2">
                NOTE: When you press the button below the OC team will begin the review process. Upon completion, students will be able to
                enroll in your course at your current price: $109.99
              </p>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Submit for review
        </button>
      </form>
    </div>
  );
};

export default SubmitForReview;