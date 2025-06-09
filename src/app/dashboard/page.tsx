import React from 'react';
import Dashboard from './home_dashboard/home_dashboard';
import { Suspense } from 'react';
import DashboardLoading from './loading';

const page = () => {
  return (
    <div>
      <Suspense fallback={<DashboardLoading />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default page;
