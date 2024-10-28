import React, { useState } from "react";
import "./HomePage.css"; // Importing CSS file for styles

const HomePage = ({ onNavigate }) => {
  const [showDocuments, setShowDocuments] = useState(false);

  const requiredDocuments = [
    "Aadhar Card",
    "PAN Card",
    "Passport Size Photo",
    "Driver's License (if applicable)",
    "Signature",
  ];

  const toggleDocuments = () => {
    setShowDocuments(!showDocuments);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Document Upload Portal</h1>
      <p className="homepage-description">
        Please upload the required documents to proceed with your application.
      </p>
      <div className="button-container">
        <button className="upload-button" onClick={onNavigate}>
          Upload Documents
        </button>
        <button className="info-button" onClick={toggleDocuments}>
          Required Documents
        </button>
      </div>
      {showDocuments && (
        <div className="documents-list">
          <h3>Required Documents:</h3>
          <ul>
            {requiredDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
