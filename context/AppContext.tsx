
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AppView, User, Habit } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { HABIT_LIMIT } from '../constants';

interface AppContextType {
    user: User | null;
    habits: Habit[];
    view: AppView;
    setView: (view: AppView) => void;
    login: (name: string, goals: string[]) => void;
    logout: () => void;
    addHabit: (habit: Omit<Habit, 'id' | 'completedDates'>) => void;
    toggleHabit: (habitId: string, date: string) => void;
    updateUser: (userData: Partial<User>) => void;
    resetProgress: () => void;
    todaysHabits: Habit[];
    getHabitStatus: (habitId: string, date: string) => boolean;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const PROTECTED_VIEWS: AppView[] = [
    AppView.DASHBOARD,
    AppView.STATS,
    AppView.PROGRAMS,
    AppView.ACCOUNT,
    AppView.UPGRADE,
];

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useLocalStorage<User | null>('user', null);
    const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
    const [view, setView] = useState<AppView>(AppView.LANDING);

    // --- Routing Guard ---
    useEffect(() => {
        if (!user && PROTECTED_VIEWS.includes(view)) {
            setView(AppView.LANDING);
        }
        if (user && (view === AppView.LANDING || view === AppView.ONBOARDING_GOALS || view === AppView.ONBOARDING_HABITS)) {
            setView(AppView.DASHBOARD);
        }
    }, [user, view]);

    const login = (name: string, goals: string[]) => {
        const newUser: User = {
            name,
            email: `${name.toLowerCase().replace(' ', '.')}@sehat.com`,
            isPremium: false,
            goals,
        };
        setUser(newUser);
        setHabits([]); // Clear habits for new user
        setView(AppView.ONBOARDING_HABITS);
    };

    const logout = () => {
        setUser(null);
        setHabits([]);
        setView(AppView.LANDING);
    };

    const resetProgress = () => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('habits');
        setUser(null);
        setHabits([]);
        setView(AppView.LANDING);
    };

    const addHabit = (habit: Omit<Habit, 'id' | 'completedDates'>) => {
        if (user && !user.isPremium && habits.length >= HABIT_LIMIT) {
            setView(AppView.UPGRADE);
            return;
        }
        const newHabit: Habit = {
            ...habit,
            id: Date.now().toString(),
            completedDates: [],
        };
        setHabits(prev => [...prev, newHabit]);
    };

    const toggleHabit = (habitId: string, date: string) => {
        setHabits(prevHabits =>
            prevHabits.map(h => {
                if (h.id === habitId) {
                    const completed = h.completedDates.includes(date);
                    const newCompletedDates = completed
                        ? h.completedDates.filter(d => d !== date)
                        : [...h.completedDates, date];
                    return { ...h, completedDates: newCompletedDates };
                }
                return h;
            })
        );
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData });
        }
    };
    
    const getTodayString = () => new Date().toISOString().split('T')[0];

    const getHabitStatus = useCallback((habitId: string, date: string) => {
        const habit = habits.find(h => h.id === habitId);
        return habit ? habit.completedDates.includes(date) : false;
    }, [habits]);

    const value = {
        user,
        habits,
        view,
        setView,
        login,
        logout,
        addHabit,
        toggleHabit,
        updateUser,
        resetProgress,
        todaysHabits: habits, // For simplicity, dashboard shows all habits
        getHabitStatus
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
