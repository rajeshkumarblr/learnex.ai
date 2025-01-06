import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from 'react-pdf';
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);

  return (
    <div className="App">
      <br/>
      <PdfComp/>
    </div>
  );
}

export default App;
