import React, { useState } from "react";
import HomePage from "./HomePage";
import DocumentUploadForm from "./DocumentUploadForm";

const App = () => {
  const [isFormPage, setIsFormPage] = useState(false);

  return (
    <div className="App">
      {isFormPage ? (
        <DocumentUploadForm />
      ) : (
        <HomePage onNavigate={() => setIsFormPage(true)} />
      )}
    </div>
  );
};

export default App;
