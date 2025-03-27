import React from 'react'
import Appeals from './appeals'
import Sidebar from '../components/sideBar'
import NavBar from '../components/navBar'

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
          <Appeals />
        </div>
      </div>
    </div>
  )
}

export default page