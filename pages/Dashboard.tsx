
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import HabitItem from '../components/HabitItem';
import AddHabitModal from '../components/AddHabitModal';

const Dashboard: React.FC = () => {
    const { habits } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);

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
                <div className="text-center bg-white p-10 rounded-xl shadow-sm border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">You haven't added any habits yet.</p>
                     <button onClick={() => setModalOpen(true)} className="mt-4 bg-emerald-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-emerald-600 transition">
                        Add Your First Habit
                    </button>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setModalOpen(true)}
                className="fixed bottom-6 right-6 bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-transform transform hover:scale-110 z-30"
                aria-label="Add new habit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>

            {/* Modal */}
            {isModalOpen && <AddHabitModal onClose={() => setModalOpen(false)} />}
        </Layout>
    );
};

export default Dashboard;
