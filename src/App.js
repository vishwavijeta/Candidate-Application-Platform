import './App.css';
import Button from '@mui/material/Button';
import { FcFlashOn } from "react-icons/fc";

function App() {
  return (
    <div className="App">
      <div className='job-container-wrapper'>
        <div className='job-container'>
          <div className='job-container-header'>
            <div className='job-company-logo'>
              <img src='https://logo.clearbit.com/rakuten.com' alt='logo' />
            </div>
            <div>
              <div className='job-company'>Rakuten</div>
              <div className='job-title'>ios</div>
              <div className='job-location'>mumbai</div>
            </div>
          </div>
          <div className='job-salary'>Estimated Salary: ₹30 - 35 LPA<span> ✅</span></div>
          <div className='job-description-wrapper'>
            <p className='job-description-about'>About Company:</p>
            <div className='job-description'>Your task is to create a candidate application platform that allows users to view job listings, filter jobs based on various criteria, and implement infinite scroll for a seamless browsing experience.
              The platform should provide a user-friendly interface for viewing and applying to jobs.
              Your task is to create a candidate application platform that allows users to view job listings, filter jobs based on various criteria, and implement infinite scroll for a seamless browsing experience.
              The platform should provide a user-friendly interface for viewing and applying to jobs.</div>
          </div>
          <div className='job-more-deatils'>
            <a href='#'>Show more</a>
          </div>
          <div className='job-experience'>
            <div className='job-experience-title'>Minimum Experience</div>
            <div className='job-experience-years'>2-5 years</div>
          </div>
          <div className='job-apply-wrapper'>
            <Button variant="contained" color="warning" size="large" startIcon={<FcFlashOn />}>
              Easy Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
