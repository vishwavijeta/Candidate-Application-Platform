import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Filters.css';


const MinimumBasePay = [0, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Experience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


export default function MultipleSelectChip({ jobs, handleFilter }) {

    const [jobRole, setJobRole] = useState([]);
    const [location, setLocation] = useState([]);
    const minExp = Experience;
    const minJdSalary = MinimumBasePay;
    const [companyName, setCompanyName] = useState([]);

    useEffect(() => {
        const uniqueJobRoles = new Set(jobRole);
        const uniqueLocations = new Set(location);
        const uniqueCompanyNames = new Set(companyName);

        jobs.forEach(element => {
            if (element.jobRole) {
                uniqueJobRoles.add(element.jobRole);
            }
            if (element.location) {
                if (element.location === 'remote') {
                    uniqueLocations.add('Remote');
                } else if (element.location === 'hybrid') {
                    uniqueLocations.add('Hybrid');
                } else {
                    uniqueLocations.add('In-Office');
                }
            }
            if (element.companyName) {
                uniqueCompanyNames.add(element.companyName);
            }
        });

        setJobRole([...uniqueJobRoles]);
        setLocation([...uniqueLocations]);
        setCompanyName([...uniqueCompanyNames]);
    }, [jobs]);


    const handleJobRoleChange = (event, value) => {
        console.log('Job Role Change', value);
        const data = { type: 'jobRole', data: value };
        // call the parent function to update the filter data
        handleFilter(data);
    };

    const handleOnChangeMinExp = (event, value) => {
        console.log('Min Exp Change', value);
        const data = { type: 'minExp', data: value };
        // call the parent function to update the filter data
        handleFilter(data);
    };

    const handleOnChangeMinJdSalary = (event, value) => {
        console.log(event, value);
        const data = { type: 'minJdSalary', data: value };
        handleFilter(data);
    };

    return (
        <div className='filter-container'>
            <Autocomplete
                size="small"
                multiple
                id="jobRole"
                options={jobRole}
                getOptionLabel={(option) => option}
                onChange={handleJobRoleChange}
                filterSelectedOptions
                placeholder="Roles"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Roles"
                    />
                )}
                sx={{ minWidth: '225px' }}
            />
            <Autocomplete
                size="small"
                id="minExp"
                options={minExp}
                getOptionLabel={(option) => option}
                Experience
                onChange={handleOnChangeMinExp}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Experience"
                    />
                )}
                sx={{ width: '150px' }}
            />
            <Autocomplete
                size="small"
                multiple
                id="tags-outlinedhhh"
                options={location}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Remote"
                    />
                )}
                sx={{ width: '125px' }}
            />
            <Autocomplete
                size="small"
                id="minJdSalary"
                options={minJdSalary}
                getOptionLabel={(option) => { return option + 'L' }}
                onChange={handleOnChangeMinJdSalary}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Minimum Base Pay Salary"
                    />
                )}
                sx={{ width: '250px' }}
            />
            <TextField id="companyName" size="small" variant="outlined" placeholder='Search Comapny Name' />
        </div>
    );
}
