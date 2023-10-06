import React, { useState } from 'react';
import axios from 'axios';
import { PDFViewer } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { pdf } from '@react-pdf/renderer';
const ResumeForm = () => {
  // Moved the useState hook calls outside of the functional component
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [college, setCollege] = useState('');
  const [city, setCity] = useState('');
  const [degree, setDegree] = useState('');
  const [dates, setDates] = useState('');
  const [achievements, setAchievements] = useState('');
  const [coursework, setCoursework] = useState('');
  const [participation, setParticipation] = useState('');
  const [pdfVisible, setPdfVisible] = useState(false);
  const [experience, setExperience] = useState([{ name: '', date: '', description: '' }]);
  const [projects, setProjects] = useState([{ name: '', date: '', description: '' }]);

  const handleInputChangeObject = (index, event, data, setter, field) => {
    const values = [...data];
    values[index][field] = event.target.value;
    setter(values);
  };

  const handleAddClick = (data, setter) => {
    setter([...data, { name: '', date: '', description: '' }]);
  };

  const handleRemoveClick = (index, data, setter) => {
    const values = [...data];
    values.splice(index, 1);
    setter(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate the PDF document
    // console.log({ name, phone, email, linkedin, github, college, city, degree, dates, experience, projects });
    const resumeData = { name, phone, email, linkedin, github, college, city, degree, dates, experience: Object.assign({}, experience), projects: Object.assign({}, projects) };
    const doc = <ResumePDF resumeData={resumeData} />;
    const asPdf = pdf(); // Instantiate the PDF document
    asPdf.updateContainer(doc); // Render the React component to the PDF document

    const blob = await asPdf.toBlob(); // Convert the PDF document to a blob

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a new link element
    const link = document.createElement('a');

    // Set the href of the link to the object URL
    link.href = url;

    // Set the download attribute of the link to specify a filename
    link.download = 'resume.pdf';

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to start the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);

    setPdfVisible(true);
  };

  console.log(experience, projects);


  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Name:</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Phone:</span>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Email:</span>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">LinkedIn:</span>
        <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Github:</span>
        <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">College:</span>
        <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">City:</span>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Degree:</span>
        <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Dates:</span>
        <input type="text" value={dates} onChange={(e) => setDates(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      {/* // Add fields for experience */}
      {experience.map((exp, index) => (
  <div key={index}>
    <div className="space-y-2">
      <label className="block">
        <span className="text-gray-700">Experience {index + 1} Name:</span>
        <input type="text" value={exp.name} onChange={(e) => handleInputChangeObject(index, e, experience, setExperience, 'name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Experience {index + 1} Date:</span>
        <input type="text" value={exp.date} onChange={(e) => handleInputChangeObject(index, e, experience, setExperience, 'date')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Experience {index + 1} Description:</span>
        <textarea value={exp.description} onChange={(e) => handleInputChangeObject(index, e, experience, setExperience, 'description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      {/* ...existing fields... */}
    </div>
    {experience.length !== 1 && 
    (<button type="button" onClick={() => handleRemoveClick(index, experience, setExperience)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>)}
  </div>
))}
{experience.length > 0 && 
(<button type="button" onClick={() => handleAddClick(experience, setExperience)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Experience</button>)}

{/* // Add fields for projects */}
{projects.map((proj, index) => (
  <div key={index}>
    <div className="space-y-2">
      <label className="block">
        <span className="text-gray-700">Project {index + 1} Name:</span>
        <input type="text" value={proj.name} onChange={(e) => handleInputChangeObject(index, e, projects, setProjects, 'name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Project {index + 1} Date:</span>
        <input type="text" value={proj.date} onChange={(e) => handleInputChangeObject(index, e, projects, setProjects, 'date')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      <label className="block">
        <span className="text-gray-700">Project {index + 1} Description:</span>
        <textarea value={proj.description} onChange={(e) => handleInputChangeObject(index, e, projects, setProjects, 'description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </label>
      {/* ...existing fields... */}
    </div>
    {projects.length !== 1 && 
    (<button type="button" onClick={() => handleRemoveClick(index, projects, setProjects)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>)}
  </div>
))}
{projects.length > 0 && 
(<button type="button" onClick={() => handleAddClick(projects, setProjects)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Project</button>)}

<button type="submit" className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Generate Resume</button>

{/* Display the generated PDF */}
{pdfVisible && (
  <PDFViewer>
    <ResumePDF resumeData={{ name, phone, email, linkedin, github, college, city, degree, dates, experience, projects }} />
  </PDFViewer>
)}
</form>
</div>
)
}

export default ResumeForm;

