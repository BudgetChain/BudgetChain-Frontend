'use client'

import React from 'react'
import PendingAppeals from './components/pendingTabs'

const page = () => {
  return (
    <div className='h-screen scrollbar-hide overflow-y-auto'>
        <PendingAppeals />
    </div>
  )
}

export default page