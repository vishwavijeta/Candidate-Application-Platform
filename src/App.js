import React, { useEffect, useState } from 'react';
import './App.css';
import JobCard from './components/JobCard/JobCard';


function App() {

  // State to store the jobs data
  const [jobs, setJobs] = useState([]);


  // Fetching the jobs data from the API
  useEffect(() => {
    fetchJobsDetails();
  }, []);

  // Function to fetch the jobs data from the API
  const fetchJobsDetails = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Request body
    const body = JSON.stringify({
      "limit": 10,
      "offset": 0
    });

    // Request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then(response => response.json())
      .then(data => {
        // Setting the jobs data in the state
        setJobs(data.jdList);
      }
      )
      .catch(error => console.log('error', error));


  };

  return (
    <>
      <JobCard jobs={jobs} />
    </>
  );
}

export default App;
