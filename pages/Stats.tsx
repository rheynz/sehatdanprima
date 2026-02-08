
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import { Habit } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-emerald-600 mt-2">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
);

const HabitStreakCalendar: React.FC<{ habit: Habit }> = ({ habit }) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="w-5 h-5"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = new Date(year, month, day).toISOString().split('T')[0];
        const isCompleted = habit.completedDates.includes(dateStr);
        const isToday = day === today.getDate();
        
        calendarDays.push(
            <div 
                key={day} 
                className={`w-5 h-5 rounded-sm ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'} ${isToday ? 'ring-2 ring-emerald-600' : ''}`}
                title={`${dateStr}: ${isCompleted ? 'Completed' : 'Incomplete'}`}
            ></div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-3 flex items-center"><span className="text-xl mr-2">{habit.icon}</span>{habit.name}</h3>
            <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-xs font-bold text-gray-400">{d}</div>)}
                {calendarDays}
            </div>
        </div>
    );
}

const Stats: React.FC = () => {
    const { habits } = useContext(AppContext);

    const { totalCompletions, bestHabit, longestStreak } = useMemo(() => {
        let totalCompletions = 0;
        let bestHabit = { name: 'N/A', completions: 0 };
        let longestStreak = 0;

        habits.forEach(habit => {
            totalCompletions += habit.completedDates.length;
            if (habit.completedDates.length > bestHabit.completions) {
                bestHabit = { name: habit.name, completions: habit.completedDates.length };
            }

            // Calculate streak for each habit
            const sortedDates = habit.completedDates.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
            if (sortedDates.length > 0) {
                let currentStreak = 1;
                for (let i = 0; i < sortedDates.length - 1; i++) {
                    const diff = (sortedDates[i].getTime() - sortedDates[i+1].getTime()) / (1000 * 3600 * 24);
                    if (diff === 1) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
            }
        });

        return { totalCompletions, bestHabit, longestStreak };
    }, [habits]);

    return (
        <Layout title="Your Statistics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Completions" value={totalCompletions} description="Across all habits" />
                <StatCard title="Longest Streak" value={`${longestStreak} days`} description="Best consecutive run" />
                <StatCard title="Most Consistent" value={bestHabit.name} description="Habit with most completions" />
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">This Month's Progress</h2>
             {habits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {habits.map(habit => <HabitStreakCalendar key={habit.id} habit={habit} />)}
                </div>
            ) : (
                <div className="text-center bg-white p-10 rounded-xl shadow-sm">
                    <p className="text-gray-500">No habit data to display yet.</p>
                    <p className="text-gray-500 mt-2">Complete some habits on the dashboard to see your stats!</p>
                </div>
            )}
        </Layout>
    );
};

export default Stats;
