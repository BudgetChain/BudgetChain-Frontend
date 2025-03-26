import React from 'react';
import AddNewProject from './add-new-project';
import NavBar from '../dashboard/components/navBar';
import Sidebar from '../dashboard/components/sideBar';

const page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-1">
          <NavBar />
          <AddNewProject />
        </div>
      </div>
    </div>
  );
};

export default page;
