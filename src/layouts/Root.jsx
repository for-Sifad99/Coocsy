import React from 'react';
import Header from '../components/Header/Header'
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';


const Root = () => {
    return (
        <>
            <header className='bg-[var(--color-bg)] text-[var(--color-primary)]'>
                <Header />
            </header>
            <main className='bg-[var(--color-bg)] text-[var(--color-primary)] pt-6 pb-10'>
                <Outlet />
            </main>
            <footer className='bg-[var(--color-bg)] text-[var(--color-primary)]'>
                <Footer />
            </footer>
        </>
    );
};

export default Root;