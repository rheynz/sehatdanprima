
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Habit } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface HabitItemProps {
    habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
    const { toggleHabit, getHabitStatus } = useContext(AppContext);
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = getHabitStatus(habit.id, today);

    const handleToggle = () => {
        toggleHabit(habit.id, today);
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isCompleted ? 'bg-emerald-100 text-gray-500 line-through' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center">
                <span className="text-2xl mr-4">{habit.icon}</span>
                <span className="font-medium">{habit.name}</span>
            </div>
            <button
                onClick={handleToggle}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-white'}`}
                aria-label={isCompleted ? `Mark '${habit.name}' as incomplete` : `Mark '${habit.name}' as complete`}
            >
                {isCompleted && <CheckIcon className="w-5 h-5 text-white" />}
            </button>
        </div>
    );
};

export default HabitItem;
