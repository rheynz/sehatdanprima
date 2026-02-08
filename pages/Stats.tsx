
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import { Habit, AppView } from '../types';

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
};

const IconStar = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;

const AdvancedStats: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-lg flex items-center mb-4">
            <IconStar className="w-5 h-5 text-amber-400 mr-2" />
            Advanced Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-medium text-gray-700 mb-2">Completion Over Time</h4>
                <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">(Premium Chart Placeholder)</p>
                </div>
            </div>
            <div>
                <h4 className="font-medium text-gray-700 mb-2">Weekly Breakdown</h4>
                <div className="space-y-2">
                    <p className="text-sm"><span className="font-bold">Best Day:</span> Wednesday (85% consistency)</p>
                    <p className="text-sm"><span className="font-bold">Worst Day:</span> Saturday (40% consistency)</p>
                    <p className="text-sm text-gray-500 mt-4">(More detailed analysis available for premium users)</p>
                </div>
            </div>
        </div>
    </div>
);

const UpgradeStatsBanner: React.FC = () => {
    const { setView } = useContext(AppContext);
    return (
        <div className="relative bg-white p-6 rounded-xl shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4">
                <h3 className="text-xl font-bold text-gray-800">Unlock Advanced Insights</h3>
                <p className="text-gray-600 mt-2 mb-4">Upgrade to Premium to see detailed charts, weekly breakdowns, and more personalized statistics.</p>
                <button 
                    onClick={() => setView(AppView.UPGRADE)}
                    className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-emerald-600 transition"
                >
                    Upgrade Now
                </button>
            </div>
            {/* Blurred content behind */}
            <h3 className="font-semibold text-lg flex items-center mb-4 text-gray-400">
                <IconStar className="w-5 h-5 text-amber-200 mr-2" />
                Advanced Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-medium text-gray-400 mb-2">Completion Over Time</h4>
                    <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">(Premium Chart Placeholder)</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-medium text-gray-400 mb-2">Weekly Breakdown</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-400"><span className="font-bold">Best Day:</span> ...</p>
                        <p className="text-sm text-gray-400"><span className="font-bold">Worst Day:</span> ...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Stats: React.FC = () => {
    const { habits, user } = useContext(AppContext);

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
            
            <div className="my-8">
                { user?.isPremium ? <AdvancedStats /> : <UpgradeStatsBanner /> }
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
