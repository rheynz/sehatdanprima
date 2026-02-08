
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { AppView } from '../types';

interface NavItemProps {
    label: string;
    view: AppView;
    currentView: AppView;
    setView: (view: AppView) => void;
    icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ label, view, currentView, setView, icon }) => (
    <button
        onClick={() => setView(view)}
        className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
            currentView === view
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`}
    >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{label}</span>
    </button>
);

const Navbar: React.FC = () => {
    const { view, setView, user } = useContext(AppContext);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', view: AppView.DASHBOARD, icon: <IconHome /> },
        { label: 'Stats', view: AppView.STATS, icon: <IconChart /> },
        { label: 'Programs', view: AppView.PROGRAMS, icon: <IconBook /> },
        { label: 'Account', view: AppView.ACCOUNT, icon: <IconUser /> },
    ];

    const navContent = (
      <div className="flex flex-col justify-between h-full">
          <div>
            <div className="px-4 py-6">
                <h1 className="text-2xl font-bold text-emerald-600">SehatPrima</h1>
                <p className="text-sm text-gray-500 mt-1">Hello, {user?.name}!</p>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavItem key={item.label} {...item} currentView={view} setView={setView} />
                ))}
            </nav>
          </div>
          <div className="p-4">
            {!user?.isPremium && (
                <button
                    onClick={() => setView(AppView.UPGRADE)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center"
                >
                    <IconStar className="mr-2" />
                    Upgrade to Pro
                </button>
            )}
          </div>
      </div>
    );

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
                <h1 className="text-xl font-bold text-emerald-600">SehatPrima</h1>
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    <IconMenu />
                </button>
            </header>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                    <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out"
                           onClick={(e) => e.stopPropagation()}>
                        {navContent}
                    </aside>
                </div>
            )}
            
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-white shadow-lg flex-shrink-0">
                {navContent}
            </aside>
        </>
    );
};

// SVG Icons
const IconHome = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const IconChart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconStar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

export default Navbar;
