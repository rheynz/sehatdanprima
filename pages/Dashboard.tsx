
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import HabitItem from '../components/HabitItem';

const Dashboard: React.FC = () => {
    const { habits, user } = useContext(AppContext);
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const completedCount = habits.filter(h => h.completedDates.includes(today.toISOString().split('T')[0])).length;
    const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

    return (
        <Layout title="Today's Dashboard">
            <div className="mb-8">
                <p className="text-gray-500">{dateString}</p>
                <div className="mt-4 bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">Daily Progress</h3>
                        <span className="font-bold text-emerald-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Habits</h2>
            {habits.length > 0 ? (
                <div className="space-y-3">
                    {habits.map(habit => (
                        <HabitItem key={habit.id} habit={habit} />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-white p-10 rounded-xl shadow-sm">
                    <p className="text-gray-500">You haven't added any habits yet.</p>
                    <p className="text-gray-500 mt-2">Maybe start with drinking more water? 💧</p>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
