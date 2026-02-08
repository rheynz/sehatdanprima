
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
