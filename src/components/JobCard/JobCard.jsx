import React from 'react'
import Button from '@mui/material/Button';
import { FcFlashOn } from "react-icons/fc";
import './ProductCard.css'

const JobCard = (props) => {


    return (
        <div className="job-card">
            {props.map((job) => (
                <div className='job-container-wrapper'>
                    <div className='job-container'>
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
                        <div className='job-salary'>Estimated Salary: {job.salaryCurrencyCode}{job.minJdSalary && job.maxJdSalary ? `${job.minJdSalary} - ${job.maxJdSalary}` : job.minJdSalary} LPA<span> ✅</span></div>
                        <div className='job-description-wrapper'>
                            <p className='job-description-about'>About Company:</p>
                            <div className='job-description'>{job.jobDetailsFromCompany}</div>
                        </div>
                        <div className='job-more-deatils'>
                            <a href='#'>Show more</a>
                        </div>
                        <div className='job-experience'>
                            <div className='job-experience-title'>{job.minExp && job.maxExp && `Minimum Experience`}</div>
                            <div className='job-experience-years'>{job.minExp && job.maxExp ? `${job.minExp}-${job.maxExp}` :
                                job.minExp ? `${job.minExp}` :
                                    job.maxExp && `${job.maxExp}`} years</div>
                        </div>
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