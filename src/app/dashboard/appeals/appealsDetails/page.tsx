import React from 'react'
import AppealsDetails from './appealsdetails'
import Sidebar from '../../components/sideBar'
import NavBar from '../../components/navBar'


function page() {
  return (
   

<div className="flex">
<div className="">
  <Sidebar />
</div>

<div className="flex-1 flex flex-col">
  <div className="">
    <NavBar />
  </div>

  <div className="flex-1">
  <AppealsDetails params={{ id: 'some-id' }} />
  </div>
</div>
</div>
  )
}

export default page