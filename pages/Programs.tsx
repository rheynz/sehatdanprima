
import React from 'react';
import Layout from '../components/Layout';

interface ProgramCardProps {
    title: string;
    description: string;
    imageUrl: string;
    duration: string;
    level: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, imageUrl, duration, level }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
        <div className="p-6">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{duration}</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">{level}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const Programs: React.FC = () => {
    const programs = [
        { title: '30-Day Yoga Challenge', description: 'Build flexibility and mindfulness with daily guided yoga sessions.', imageUrl: 'https://picsum.photos/400/200?random=1', duration: '30 Days', level: 'Beginner' },
        { title: 'Mindful Meditation Intro', description: 'Learn the basics of meditation to reduce stress and improve focus.', imageUrl: 'https://picsum.photos/400/200?random=2', duration: '7 Days', level: 'Beginner' },
        { title: 'HIIT for Energy Boost', description: 'High-intensity interval training to supercharge your metabolism and energy levels.', imageUrl: 'https://picsum.photos/400/200?random=3', duration: '14 Days', level: 'Intermediate' },
        { title: 'Clean Eating Kickstart', description: 'A guided program to reset your diet with healthy, whole foods.', imageUrl: 'https://picsum.photos/400/200?random=4', duration: '21 Days', level: 'All Levels' },
    ];

    return (
        <Layout title="Health Programs">
            <p className="mb-6 text-gray-600">Discover guided programs to help you achieve your health goals faster. More programs coming soon!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programs.map(program => <ProgramCard key={program.title} {...program} />)}
            </div>
        </Layout>
    );
};

export default Programs;
