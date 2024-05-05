import React, { useEffect, useState, memo, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Filters.css';
import { Experience, MinimumBasePay } from '../../utils/utils';


const Filters = ({ jobs, handleFilter }) => {

    const [jobRole, setJobRole] = useState([]);
    const [location, setLocation] = useState([]);

    // Memoize the values of minExp and minJdSalary
    const minExp = useMemo(() => Experience, []);
    const minJdSalary = useMemo(() => MinimumBasePay, []);

    const [companyName, setCompanyName] = useState([]);
    const [inOfficeLocation, setInOfficeLocation] = useState([]);

    useEffect(() => {
        const uniqueJobRoles = new Set(jobRole);
        const uniqueLocations = new Set(location);
        const uniqueCompanyNames = new Set(companyName);
        let inOfficeLocationArray = [];

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
                    inOfficeLocationArray.push(element.location);
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
        setInOfficeLocation(inOfficeLocationArray);
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

    const handleLocationChange = (event, value) => {
        console.log('Location Change', value);

        console.log('In Office Location', inOfficeLocation);
        // Define a mapping object for selected options to job locations
        const locationMap = {
            'Remote': ['remote'],
            'Hybrid': ['hybrid'],
            'In-Office': inOfficeLocation
        };

        // Map selected options to job locations and flatten the array
        const requiredLocation = value.flatMap(option => locationMap[option]);

        const data = { type: 'location', data: requiredLocation };
        handleFilter(data);
    };

    const search = (event) => {
        const searchTerm = event.target.value;
        // Convert search term to lowercase for case-insensitive search
        const searchTermLower = searchTerm.toLowerCase();

        // Filter items based on whether they contain the search term
        const filteredCompanies = companyName.filter(item => item.toLowerCase().includes(searchTermLower));

        // If no items match the search term
        // then so nothing
        if (filteredCompanies.length === 0) {
            const data = { type: 'companyName', data: ['companyName'] };
            handleFilter(data);
            return;
        }

        const data = { type: 'companyName', data: filteredCompanies };
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
                onChange={handleLocationChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Remote"
                    />
                )}
                sx={{ minWidth: '125px' }}
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
            <TextField id="companyName" size="small" variant="outlined" sx={{ width: '250px', height: '36px' }}
                placeholder='Search Comapny Name' onChange={search} />
        </div>
    );
};

export default memo(Filters);