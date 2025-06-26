import React from 'react';
import Sidebar from '../pages/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const DashRoot = () => {
    return <>
        {/* Content */}
        <section className='flex justify-between gap-6 p-6'>
            {/* Sidebar Content */}
            <div className='w-1/4 min-h-screen sticky bg-base-200 text-Black font-bold'>
                <Sidebar />
            </div>
            {/* Main Content */}
            <div className='w-3/4'>
                <Outlet />
            </div>
        </section>
    </>
};

export default DashRoot;