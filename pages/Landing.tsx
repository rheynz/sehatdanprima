
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppView } from '../types';

const Landing: React.FC = () => {
    const { setView } = useContext(AppContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col justify-center items-center p-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-600">
                    Sehat dan Prima
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600">
                    Build healthy habits that last. Track your progress, achieve your goals, and become the best version of yourself.
                </p>
                <div className="mt-10">
                    <button
                        onClick={() => setView(AppView.ONBOARDING_GOALS)}
                        className="bg-emerald-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300 text-lg"
                    >
                        Get Started for Free
                    </button>
                </div>
            </div>
            <footer className="absolute bottom-4 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Sehat dan Prima. All rights reserved.
            </footer>
        </div>
    );
};

export default Landing;
