// import React, { useState } from "react";
// import "./DocumentUploadForm.css"; // Importing CSS file

// const DocumentUploadForm = () => {
//   const [formData, setFormData] = useState({
//     aadharCard: null,
//     panCard: null,
//     passport: null,
//     driversLicense: null,
//     passportPhoto: null,
//     signature: null,
//   });

//   const [errors, setErrors] = useState({});

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.aadharCard) newErrors.aadharCard = "Aadhar Card is required";
//     if (!formData.panCard) newErrors.panCard = "PAN Card is required";
//     if (!formData.passportPhoto) newErrors.passportPhoto = "Passport Size Photo is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       // Handle form submission, like sending data to server
//       alert("Documents uploaded successfully!");
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       aadharCard: null,
//       panCard: null,
//       passport: null,
//       driversLicense: null,
//       passportPhoto: null,
//       signature: null,
//     });
//     setErrors({});
//   };

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Upload Documents</h2>
//       <form onSubmit={handleSubmit} className="document-upload-form">
//         {[
//           // { label: "Aadhar Card", name: "aadharCard", required: true },
//           { label: "PAN Card", name: "panCard", required: true },
//           // { label: "Passport", name: "passport", required: false },
//           // { label: "Driver's License", name: "driversLicense", required: false },
//           // { label: "Passport Size Photo", name: "passportPhoto", required: true },
//           // { label: "Signature", name: "signature", required: false },
//         ].map((field, index) => (
//           <div className="form-group" key={index}>
//             <label className="form-label">
//               {field.label} {field.required && <span className="required">*</span>}
//             </label>
//             <input
//               type="file"
//               name={field.name}
//               onChange={handleFileChange}
//               className={errors[field.name] ? "error-input" : ""}
//             />
//             {field.required && errors[field.name] && <p className="error">{errors[field.name]}</p>}
//           </div>
//         ))}
//         <div className="button-container">
//           <button type="submit" className="submit-button">Upload</button>
//           <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DocumentUploadForm;


// import React, { useState } from "react";
// import "./DocumentUploadForm.css"; // Importing CSS file

// const DocumentUploadForm = () => {
//   const [formData, setFormData] = useState({
//     aadharCard: null,
//     panCard: null,
//     passport: null,
//     driversLicense: null,
//     passportPhoto: null,
//     signature: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [response, setResponse] = useState(null);

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     // Basic validation to ensure required fields are filled
//     // if (!formData.aadharCard) newErrors.aadharCard = "Aadhar Card is required";
//     if (!formData.panCard) newErrors.panCard = "PAN Card is required";
//     // if (!formData.passportPhoto) newErrors.passportPhoto = "Passport Size Photo is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       // Create a FormData object to send the files
//       const data = new FormData();
//       data.append("panCard", formData.panCard);
//       // if (formData.aadharCard) data.append("aadharCard", formData.aadharCard);
//       // if (formData.passportPhoto) data.append("passportPhoto", formData.passportPhoto);

//       try {
//         // Send data to the FastAPI backend
//         const response = await fetch("http://localhost:8000/extract_pan_details/", {
//           method: "POST",
//           body: data,
//         });

//         // Check if the response is okay (status code 200-299)
//         const result = await response.json();
//         if (response.ok) {
//           setResponse(result);
//           alert("Documents uploaded successfully!");
//         } else {
//           setResponse(result);
//           alert("Error uploading documents: " + result.error);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Error uploading documents: " + error.message);
//       }
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       aadharCard: null,
//       panCard: null,
//       passport: null,
//       driversLicense: null,
//       passportPhoto: null,
//       signature: null,
//     });
//     setErrors({});
//     setResponse(null); // Clear previous response
//   };

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Upload Documents</h2>
//       <form onSubmit={handleSubmit} className="document-upload-form">
//         {[
//           { label: "PAN Card", name: "panCard", required: true },
//           // { label: "Aadhar Card", name: "aadharCard", required: true },
//           // { label: "Passport Size Photo", name: "passportPhoto", required: true },
//         ].map((field, index) => (
//           <div className="form-group" key={index}>
//             <label className="form-label">
//               {field.label} {field.required && <span className="required">*</span>}
//             </label>
//             <input
//               type="file"
//               name={field.name}
//               onChange={handleFileChange}
//               className={errors[field.name] ? "error-input" : ""}
//             />
//             {field.required && errors[field.name] && <p className="error">{errors[field.name]}</p>}
//           </div>
//         ))}
//         <div className="button-container">
//           <button type="submit" className="submit-button" onClick={handleSubmit}>Upload</button>
//           <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
//         </div>
//       </form>
//       {response && (
//         <div className="response">
//           <h3>Extracted Fields:</h3>
//           {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentUploadForm;


import React, { useState } from "react";
import "./DocumentUploadForm.css"; // Importing CSS file

const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    aadharCard: null,
    panCard: null,
    passport: null,
    driversLicense: null,
    passportPhoto: null,
    signature: null,
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation to ensure required fields are filled
    if (!formData.panCard) newErrors.panCard = "PAN Card is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Create a FormData object to send the files
      const data = new FormData();
      data.append("panCard", formData.panCard);

      try {
        // Send data to the FastAPI backend
        const response = await fetch("http://localhost:8000/extract_pan_details/", {
          method: "POST",
          body: data,
        });

        // Check if the response is okay (status code 200-299)
        const result = await response.json();
        if (response.ok) {
          setResponse(result);
          alert("Documents uploaded successfully!");
        } else {
          setResponse(result);
          alert("Error uploading documents: " + result.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error uploading documents: " + error.message);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      aadharCard: null,
      panCard: null,
      passport: null,
      driversLicense: null,
      passportPhoto: null,
      signature: null,
    });
    setErrors({});
    setResponse(null); // Clear previous response
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Upload Documents</h2>
      <form onSubmit={handleSubmit} className="document-upload-form">
        {[
          { label: "PAN Card", name: "panCard", required: true },
          // { label: "Aadhar Card", name: "aadharCard", required: true },
          // { label: "Passport Size Photo", name: "passportPhoto", required: true },
        ].map((field, index) => (
          <div className="form-group" key={index}>
            <label className="form-label">
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <input
              type="file"
              name={field.name}
              onChange={handleFileChange}
              className={errors[field.name] ? "error-input" : ""}
            />
            {field.required && errors[field.name] && <p className="error">{errors[field.name]}</p>}
          </div>
        ))}
        <div className="button-container">
          <button type="submit" className="submit-button" onClick={handleSubmit}>Upload & Extract</button>
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      {response && (
        <div className="response">
          <h3>Extracted Fields:</h3>
          <ul>
            {response.Name && <li><strong>Name:</strong> {response.Name}</li>}
            {response.Father_name && <li><strong>Father's Name:</strong> {response.Father_name}</li>}
            {response.PAN && <li><strong>PAN Number:</strong> {response.PAN}</li>}
            {response.dob && <li><strong>Date of Birth:</strong> {response.dob}</li>}
            {/* Add more fields as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadForm;
