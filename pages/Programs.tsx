
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppView, Program } from '../types';
import Layout from '../components/Layout';

interface ProgramCardProps {
    program: Program;
    onClick: () => void;
    isLocked: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onClick, isLocked }) => (
    <div 
        className="bg-white rounded-xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
        onClick={onClick}
    >
        <div className="relative">
            <img src={program.imageUrl} alt={program.title} className={`w-full h-40 object-cover ${isLocked ? 'filter brightness-50' : ''}`} />
            {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span className="font-bold mt-2">Premium</span>
                </div>
            )}
        </div>
        <div className="p-6">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{program.duration}</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">{program.level}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
            <p className="text-gray-600">{program.description}</p>
        </div>
    </div>
);

const Programs: React.FC = () => {
    const { user, setView } = useContext(AppContext);

    const programs: Program[] = [
        { title: '30-Day Yoga Challenge', description: 'Build flexibility and mindfulness with daily guided yoga sessions.', imageUrl: 'https://picsum.photos/400/200?random=1', duration: '30 Days', level: 'Beginner', isPremium: false },
        { title: 'Mindful Meditation Intro', description: 'Learn the basics of meditation to reduce stress and improve focus.', imageUrl: 'https://picsum.photos/400/200?random=2', duration: '7 Days', level: 'Beginner', isPremium: false },
        { title: 'HIIT for Energy Boost', description: 'High-intensity interval training to supercharge your metabolism and energy levels.', imageUrl: 'https://picsum.photos/400/200?random=3', duration: '14 Days', level: 'Intermediate', isPremium: true },
        { title: 'Clean Eating Kickstart', description: 'A guided program to reset your diet with healthy, whole foods.', imageUrl: 'https://picsum.photos/400/200?random=4', duration: '21 Days', level: 'All Levels', isPremium: true },
    ];

    const handleProgramClick = (program: Program) => {
        if (program.isPremium && !user?.isPremium) {
            setView(AppView.UPGRADE);
        } else {
            // In a real app, this would navigate to the program details.
            alert(`Starting program: ${program.title}`);
        }
    };

    return (
        <Layout title="Health Programs">
            <p className="mb-6 text-gray-600">Discover guided programs to help you achieve your health goals faster. More programs coming soon!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programs.map(program => (
                    <ProgramCard 
                        key={program.title} 
                        program={program}
                        isLocked={!!(program.isPremium && !user?.isPremium)}
                        onClick={() => handleProgramClick(program)} 
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Programs;
