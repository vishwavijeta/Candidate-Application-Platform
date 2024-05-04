import React, { useState } from 'react';
import './App.css';
import JobCard from './components/JobCard/JobCard';


function App() {

  const [jobs, setJobs] = useState([]);

  return (
    <>
      <JobCard jobs={jobs} />
    </>
  );
}

export default App;
