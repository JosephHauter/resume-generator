import logo from './logo.svg';
import './App.css';
import ResumeForm from './pages/ResumeForm';
import TestPDF from './pages/testpdf';
import ResumePDF from './pages/ResumePDF';
import { PDFViewer } from '@react-pdf/renderer';function App() {
  
  return (
    <div className="">
      
      <ResumeForm />
      <PDFViewer>
  {/* <TestPDF /> */}
  {/* <ResumePDF /> */}
</PDFViewer>
    </div>
  );
}

export default App;
