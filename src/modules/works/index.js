import React from 'react';
import JobsTable from './components/jobsTable';
import JobsMap from './components/jobsMap';

const Works = () => {
  return (
    <div>
      <JobsMap />
      <br></br>
      <JobsTable />
    </div>
  );
}

export default Works;