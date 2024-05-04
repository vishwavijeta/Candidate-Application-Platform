import React, { useEffect, useState } from 'react';
import './App.css';
import JobCard from './components/JobCard/JobCard';
import CircularProgress from '@mui/material/CircularProgress';


function App() {

  // State to store the jobs data
  const [jobs, setJobs] = useState([]);

  // State to store the offset
  const [offset, setOffset] = useState(0);

  // State to store the infinite scroll loading
  const [infinteScrollLoading, setInfinteScrollLoading] = useState(false);


  // Fetching the jobs data from the API
  useEffect(() => {
    fetchJobsDetails();
  }, [offset]);


  // Adding the scroll event listener
  // added the infinteScrollLoading in the dependency array
  // to remove the event listener when the infinteScrollLoading state is changed 
  // to remove cache issues of the handleScroll function
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Removing the event listener when the component is unmounted
    return () => window.removeEventListener('scroll', handleScroll);
  }, [infinteScrollLoading]);

  // Function to fetch the jobs data from the API
  const fetchJobsDetails = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Request body
    // offset should be incremented by 10 for each request
    const body = JSON.stringify({
      "limit": 10,
      "offset": offset,
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
        console.log('data coming from the API', data);
        // Setting the jobs data in the state
        setJobs(prevJobs => [...prevJobs, ...data.jdList]);
      })
      .catch(error => {
        // Logging the error
        console.log('error', error)
      })
      .finally(() => {
        // Setting the infinite scroll loading to false
        setInfinteScrollLoading(false)
      });
  };

  const handleScroll = () => {
    // window.innerHeight means the height of the browser window
    const height = window.innerHeight;

    // document.documentElement.scrollTop means the distance from the top of the page to the top of the viewport
    const scrollTop = document.documentElement.scrollTop;

    // document.documentElement.offsetHeight means the height of the entire document
    const offsetHeight = document.documentElement.offsetHeight;

    /** 
      If the sum of the height of the browser window and 
      the distance from the top of the page to the top of 
      the viewport is less than the height of the entire document, then return
      Also. if the infinite scroll loading is true, then return
    */
    if (height + scrollTop < offsetHeight && infinteScrollLoading) return;

    // increment the offset by 10 and set the infinite scroll loading to true
    setOffset(prevOffset => prevOffset + 10);
    setInfinteScrollLoading(true);
  };

  return (
    <>
      <JobCard jobs={jobs} />
      {infinteScrollLoading &&
        <div className='circular-progress'>
          <CircularProgress />
        </div>
      }
    </>
  );
}

export default App;
