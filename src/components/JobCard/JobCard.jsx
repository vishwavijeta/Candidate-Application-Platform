import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { FcFlashOn } from "react-icons/fc";
import './JobCard.css'

const JobCard = ({ jobs }) => {
    // State to manage the expanded state for each job
    const [expandedJobs, setExpandedJobs] = useState({});

    // Function to handle expanding or collapsing a job description
    const handleShowMoreClick = (index) => {
        setExpandedJobs(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    function formattingMinMaxData(min, max) {
        if (min && max) {
            return `${min}-${max}`;
        } else if (min) {
            return `${min}`;
        } else if (max) {
            return `${max}`;
        }
        return;
    }

    return (
        <div className="job-card">
            {jobs.map((job, index) => (
                <div className='job-container-wrapper' key={index}>
                    <div className={`job-container ${expandedJobs[index] ? 'expand-job-description' : ''}`}>
                        <div className='job-container-header'>
                            <div className='job-company-logo'>
                                <img src={job.logoUrl} alt='logo' />
                            </div>
                            <div>
                                <div className='job-company'>{job.companyName}</div>
                                <div className='job-title'>{job.jobRole}</div>
                                <div className='job-location'>{job.location}</div>
                            </div>
                        </div>
                        <div className='job-salary'>Estimated Salary: {job.salaryCurrencyCode} {formattingMinMaxData(job.minJdSalary, job.maxJdSalary)} LPA<span> ✅</span></div>
                        <div className='job-description-wrapper'>
                            <p className='job-description-about'>About Company:</p>
                            <div className='job-description'>{job.jobDetailsFromCompany}</div>
                        </div>
                        <div className='job-more-details'>
                            <a onClick={() => handleShowMoreClick(index)}> {expandedJobs[index] ? 'Show less' : 'Show more'}</a>
                        </div>
                        {job.minExp && job.maxExp &&
                            <div className='job-experience'>
                                <div className='job-experience-title'>Minimum Experience</div>
                                <div className='job-experience-years'>{formattingMinMaxData(job.minExp, job.maxExp)} years</div>
                            </div>
                        }
                        <div className='job-apply-wrapper'>
                            <Button variant="contained" color="warning" size="large" startIcon={<FcFlashOn />}>
                                Easy Apply
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default JobCard