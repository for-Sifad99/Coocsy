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
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Root;