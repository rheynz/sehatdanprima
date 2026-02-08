
import { Goal, PresetHabit } from './types';

export const PRESET_GOALS: Goal[] = [
    { id: 'lose_weight', name: 'Lose Weight', icon: '⚖️' },
    { id: 'build_muscle', name: 'Build Muscle', icon: '💪' },
    { id: 'improve_sleep', name: 'Improve Sleep', icon: '😴' },
    { id: 'reduce_stress', name: 'Reduce Stress', icon: '🧘' },
    { id: 'eat_healthier', name: 'Eat Healthier', icon: '🥗' },
    { id: 'increase_energy', name: 'Increase Energy', icon: '⚡️' },
];

export const PRESET_HABITS: PresetHabit[] = [
    { name: 'Drink 8 glasses of water', icon: '💧' },
    { name: 'Walk 10,000 steps', icon: '👟' },
    { name: 'Read for 15 minutes', icon: '📚' },
    { name: 'Meditate for 10 minutes', icon: '🧘' },
    { name: 'No sugar after 8 PM', icon: '🚫' },
    { name: 'Sleep 8 hours', icon: '😴' },
    { name: 'Eat 5 servings of fruit/veg', icon: '🥦' },
    { name: '30-min workout', icon: '🏋️' },
];

export const HABIT_LIMIT = 3;
