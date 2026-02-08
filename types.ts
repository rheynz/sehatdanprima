
export enum AppView {
    LANDING,
    ONBOARDING_GOALS,
    ONBOARDING_HABITS,
    DASHBOARD,
    STATS,
    PROGRAMS,
    ACCOUNT,
    UPGRADE,
}

export interface User {
    name: string;
    email: string;
    isPremium: boolean;
    goals: string[];
}

export interface Habit {
    id: string;
    name: string;
    icon: string; // Emoji or SVG name
    completedDates: string[]; // Array of 'YYYY-MM-DD' strings
}

export interface Goal {
    id: string;
    name: string;
    icon: string;
}

export interface PresetHabit {
    name: string;
    icon: string;
}

export interface Program {
    title: string;
    description: string;
    imageUrl: string;
    duration: string;
    level: string;
    isPremium: boolean;
}
