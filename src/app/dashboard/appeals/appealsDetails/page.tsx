import React from 'react'
import AppealsDetails from './appealsdetails'

function page() {
  return (
    <div className="flex">
      <div className="flex-1">
        <AppealsDetails params={{ id: 'some-id' }} />
      </div>
    </div>
  );
}

export default page;
