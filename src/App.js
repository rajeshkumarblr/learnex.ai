import { useState } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "./components/PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function App() {
  const [selectedPdf, setSelectedPdf] = useState("/sample.pdf");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedPdf(fileUrl);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="sidebar">
          <h3>PDF Viewer</h3>
          <button
            className="select-button"
            onClick={() => document.getElementById("pdfInput").click()}
          >
            Select PDF
          </button>
          <input
            id="pdfInput"
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>
        <div className="content">
          <PdfComp pdfFile={selectedPdf} />
        </div>
      </div>
    </div>
  );
}

export default App;
