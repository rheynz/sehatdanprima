
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PRESET_HABITS, HABIT_LIMIT } from '../constants';
import { AppView } from '../types';

interface AddHabitModalProps {
    onClose: () => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose }) => {
    const { user, habits, addHabit, setView } = useContext(AppContext);
    const [customName, setCustomName] = useState('');
    const [customIcon, setCustomIcon] = useState('💡');

    const handleAddPreset = (habit: { name: string, icon: string }) => {
        if (user && !user.isPremium && habits.length >= HABIT_LIMIT) {
            setView(AppView.UPGRADE);
            return;
        }
        addHabit(habit);
        onClose();
    };
    
    const handleAddCustom = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customName.trim() || !customIcon.trim()) return;

        // This action is premium-only, so no need to check limit
        addHabit({ name: customName, icon: customIcon });
        setCustomName('');
        setCustomIcon('💡');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add a New Habit</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>
                
                {/* Custom Habit Form (Premium) */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Create Your Own</h3>
                    {user?.isPremium ? (
                        <form onSubmit={handleAddCustom} className="flex gap-3">
                            <input 
                                type="text"
                                value={customIcon}
                                onChange={e => setCustomIcon(e.target.value)}
                                className="w-12 text-center text-2xl p-2 border rounded-lg"
                                maxLength={2}
                            />
                             <input 
                                type="text"
                                value={customName}
                                onChange={e => setCustomName(e.target.value)}
                                placeholder="e.g., Go for a run"
                                className="flex-1 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                required
                            />
                            <button type="submit" className="bg-emerald-500 text-white font-bold p-3 rounded-lg hover:bg-emerald-600 transition-colors">+</button>
                        </form>
                    ) : (
                        <div className="relative text-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <p className="text-gray-500">Creating custom habits is a Premium feature.</p>
                            <button onClick={() => setView(AppView.UPGRADE)} className="mt-3 bg-amber-400 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-amber-500 transition-colors">Upgrade to unlock</button>
                        </div>
                    )}
                </div>

                {/* Preset Habits */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Or Choose a Preset</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {PRESET_HABITS.map(habit => (
                            <button
                                key={habit.name}
                                onClick={() => handleAddPreset(habit)}
                                className="p-3 border rounded-lg text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                            >
                                <span className="text-2xl">{habit.icon}</span>
                                <p className="font-medium mt-1 text-xs">{habit.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHabitModal;
