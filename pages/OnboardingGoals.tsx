
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PRESET_GOALS } from '../constants';
import { CheckIcon } from '../components/icons/CheckIcon';

const OnboardingGoals: React.FC = () => {
    const { login } = useContext(AppContext);
    const [name, setName] = useState('');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [error, setError] = useState('');

    const toggleGoal = (goalId: string) => {
        setSelectedGoals(prev =>
            prev.includes(goalId) ? prev.filter(id => id !== goalId) : [...prev, goalId]
        );
    };

    const handleSubmit = () => {
        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (selectedGoals.length === 0) {
            setError('Please select at least one goal.');
            return;
        }
        setError('');
        login(name, selectedGoals);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome! What's your name?</h1>
                    <p className="text-gray-500 mt-2">Let's start by getting to know you.</p>
                </div>
                
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Alex"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">What are your main goals?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {PRESET_GOALS.map(goal => (
                            <button
                                key={goal.id}
                                onClick={() => toggleGoal(goal.id)}
                                className={`p-4 border rounded-lg text-center transition-all duration-200 ${
                                    selectedGoals.includes(goal.id)
                                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-sm'
                                }`}
                            >
                                <span className="text-3xl">{goal.icon}</span>
                                <p className="font-medium mt-2 text-sm">{goal.name}</p>
                                {selectedGoals.includes(goal.id) && <div className="absolute top-2 right-2 bg-white rounded-full p-0.5"><CheckIcon className="w-4 h-4 text-emerald-500"/></div>}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <button
                    onClick={handleSubmit}
                    className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default OnboardingGoals;
