
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import { AppView } from '../types';
import { CheckIcon } from '../components/icons/CheckIcon';

const Upgrade: React.FC = () => {
    const { updateUser, setView } = useContext(AppContext);

    const handleUpgrade = () => {
        updateUser({ isPremium: true });
        setView(AppView.DASHBOARD);
    };

    const features = [
        "Unlimited habit tracking",
        "Advanced statistics and insights",
        "Access to all health programs",
        "Custom habit icons & colors",
        "Priority support",
    ];

    return (
        <Layout title="Upgrade to Premium">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-lg mx-auto">
                <div className="mb-4">
                    <span className="text-5xl">✨</span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Go Premium</h2>
                <p className="text-gray-600 mb-8">Unlock your full potential and achieve your goals faster with our premium features.</p>
                
                <div className="space-y-4 text-left mb-10">
                    {features.map(feature => (
                        <div key={feature} className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-3 flex-shrink-0">
                                <CheckIcon className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-emerald-50 rounded-lg mb-8">
                    <p className="text-3xl font-bold text-emerald-600">$4.99<span className="text-lg font-normal text-gray-500">/month</span></p>
                    <p className="text-sm text-gray-500">Billed annually. Cancel anytime.</p>
                </div>
                
                <button
                    onClick={handleUpgrade}
                    className="w-full bg-emerald-500 text-white font-bold py-4 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300 text-lg"
                >
                    Upgrade Now
                </button>

                <button
                    onClick={() => setView(AppView.DASHBOARD)}
                    className="mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                    Maybe later
                </button>
            </div>
        </Layout>
    );
};

export default Upgrade;
