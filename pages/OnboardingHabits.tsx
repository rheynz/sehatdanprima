
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppView } from '../types';
import { PRESET_HABITS, HABIT_LIMIT } from '../constants';
import { CheckIcon } from '../components/icons/CheckIcon';

const OnboardingHabits: React.FC = () => {
    const { addHabit, setView, user, habits } = useContext(AppContext);
    const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
    const [error, setError] = useState('');

    const habitsLeft = HABIT_LIMIT - habits.length - selectedHabits.length;

    const toggleHabit = (habitName: string) => {
        setError('');
        if (selectedHabits.includes(habitName)) {
            setSelectedHabits(prev => prev.filter(name => name !== habitName));
        } else {
            if (user && !user.isPremium && habits.length + selectedHabits.length >= HABIT_LIMIT) {
                setError(`As a free user, you can only select up to ${HABIT_LIMIT} habits.`);
                return;
            }
            setSelectedHabits(prev => [...prev, habitName]);
        }
    };

    const handleSubmit = () => {
        if (selectedHabits.length === 0) {
            setError('Please select at least one habit to start with.');
            return;
        }

        selectedHabits.forEach(habitName => {
            const habitData = PRESET_HABITS.find(h => h.name === habitName);
            if (habitData) {
                addHabit(habitData);
            }
        });

        setView(AppView.DASHBOARD);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Let's build some habits!</h1>
                    <p className="text-gray-500 mt-2">Choose a few to get started. You can add more later.</p>
                </div>

                <div className="mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {PRESET_HABITS.map(habit => (
                            <button
                                key={habit.name}
                                onClick={() => toggleHabit(habit.name)}
                                className={`p-4 border rounded-lg text-center transition-all duration-200 relative ${
                                    selectedHabits.includes(habit.name)
                                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-sm'
                                }`}
                            >
                                <span className="text-3xl">{habit.icon}</span>
                                <p className="font-medium mt-2 text-sm">{habit.name}</p>
                                {selectedHabits.includes(habit.name) && <div className="absolute top-2 right-2 bg-white rounded-full p-0.5"><CheckIcon className="w-4 h-4 text-emerald-500"/></div>}
                            </button>
                        ))}
                    </div>
                </div>

                {!user?.isPremium && (
                    <p className="text-center text-sm text-gray-500 mb-4">
                        You can select <span className="font-bold text-emerald-600">{habitsLeft}</span> more habits.
                    </p>
                )}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300"
                    >
                        Finish Setup
                    </button>
                    <button
                        onClick={() => setView(AppView.DASHBOARD)}
                        className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Skip for Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingHabits;
