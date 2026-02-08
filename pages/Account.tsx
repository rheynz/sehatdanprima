
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppView } from '../types';
import Layout from '../components/Layout';

const Account: React.FC = () => {
    const { user, logout, resetProgress, setView } = useContext(AppContext);

    if (!user) {
        return null; // Should be redirected by guard
    }

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
            resetProgress();
        }
    };

    return (
        <Layout title="My Account">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-6">
                <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Subscription</span>
                        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${user.isPremium ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                            {user.isPremium ? 'Premium' : 'Free'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-6">
                <h3 className="text-xl font-semibold mb-4">Actions</h3>
                <div className="space-y-4">
                    {!user.isPremium && (
                        <button
                            onClick={() => setView(AppView.UPGRADE)}
                            className="w-full text-left p-4 rounded-lg bg-amber-400 text-white font-bold hover:bg-amber-500 transition-colors"
                        >
                            Upgrade to Premium
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="w-full text-left p-4 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                        Log Out
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full text-left p-4 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors"
                    >
                        Reset All Progress
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Account;
