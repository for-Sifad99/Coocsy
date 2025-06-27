import React from 'react';
import Sidebar from '../pages/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const DashRoot = () => {
    return <>
        {/* Content */}
        <section className='flex justify-between gap-6 p-6 min-h-screen bg-[var(--color-section-bg)]'>
            {/* Sidebar Content */}
            <div>
                <Sidebar />
            </div>
            {/* Main Content */}
            <div className='flex-1'>
                <Outlet />
            </div>
        </section>
    </>
};

export default DashRoot;