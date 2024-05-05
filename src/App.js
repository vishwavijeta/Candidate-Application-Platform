import React, { useEffect, useState } from 'react';
import './App.css';
import JobCard from './components/JobCard/JobCard';
import CircularProgress from '@mui/material/CircularProgress';
import Filters from './components/Filters/Filters';
import { filters } from './utils/utils';

function App() {

  // State to store the jobs data
  // that will be displayed on the UI
  const [jobs, setJobs] = useState([]);

  // State to store the all the jobs data
  // coming from the API
  const [dataToBeFiltered, setDataToBeFiltered] = useState([]);

  // State to store the filters conditions
  const [filteredConditions, setFilteredConditions] = useState(filters);

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


  useEffect(() => {
    console.log('filtered Conditions', filteredConditions);
    // calling the filteredJobs function when the filteredConditions are changed
    filteredJobs(filteredConditions);
  }, [filteredConditions, dataToBeFiltered]);



  // Function to fetch the jobs data from the API
  const fetchJobsDetails = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Request body
    // offset should be incremented by 10 for each request
    const body = JSON.stringify({
      "limit": 12,
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
        // updating the dataToBeFiltered state with the data coming from the API
        // it has all the jobs data
        setDataToBeFiltered(prevFiltersData => [...prevFiltersData, ...data.jdList]);
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
      5 is added to the sum of the height of the browser window and 
      the distance from the top of the page to the top of the viewport
      to make the infinite scroll loading to start before reaching the end of the page
    */
    if (height + scrollTop + 5 < offsetHeight || infinteScrollLoading) return;

    // increment the offset by 10 and set the infinite scroll loading to true
    setOffset(prevOffset => prevOffset + 12);
    setInfinteScrollLoading(true);
  };


  // callback function to handle the filter
  // called from the Filters component
  // filter is an object with type and data
  const handleFilter = (filter) => {
    console.log('New filter condition coming from the Filters component', filter);

    // replace a block in the filteredConditions with the new filter
    // for example, if the filter is {type: 'companyName', data: ['Google', 'Microsoft']}
    setFilteredConditions(prevFilteredConditions => {
      return {
        ...prevFilteredConditions,
        [filter.type]: filter.data
      }
    });
  }

  // Function to filter the jobs data
  // based on the filters conditions
  const filteredJobs = (filterCondition) => {
    // Filtering the data based on the filter conditions
    const filteredData = dataToBeFiltered.filter(job => {
      // Filter by companyName
      if (filterCondition.companyName.length > 0 && !filterCondition.companyName.includes(job.companyName)) {
        return false;
      }

      // Filter by jobRole
      if (filterCondition.jobRole.length > 0 && !filterCondition.jobRole.includes(job.jobRole)) {
        return false;
      }

      // Filter by minExp
      if (job.minExp < filterCondition.minExp) {
        return false;
      }

      // Filter by minJdSalary
      if (job.minJdSalary < filterCondition.minJdSalary) {
        return false;
      }

      // Filter by location
      if (filterCondition.location.length > 0 && !filterCondition.location.includes(job.location)) {
        return false;
      }

      // Include the job if it passes all filters
      return true;
    });

    // If no jobs are found based on the filter conditions
    // then log the message and set the infinite scroll loading to true
    if (filteredData.length === 0 && dataToBeFiltered.length > 0) {
      console.log('No jobs found based on the filter conditions');
      // increment the offset by 10 and set the infinite scroll loading to true
      setOffset(prevOffset => prevOffset + 12);
    }

    // updating the jobs state with the filtered data
    // that will be displayed on the UI
    setJobs(filteredData);
  }

  // show Loading when the jobs data is not fetched
  if (dataToBeFiltered.length === 0) {
    return (
      <div className='loading-data'>
        <CircularProgress />
        <div style={{ marginTop: '10px' }}>Please wait while we are fetching the jobs data...</div>
      </div>
    );
  }


  return (
    <>
      <Filters jobs={dataToBeFiltered} handleFilter={handleFilter} />
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
