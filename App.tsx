
import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { AppView } from './types';

import Landing from './pages/Landing';
import OnboardingGoals from './pages/OnboardingGoals';
import OnboardingHabits from './pages/OnboardingHabits';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Programs from './pages/Programs';
import Account from './pages/Account';
import Upgrade from './pages/Upgrade';

const AppContent: React.FC = () => {
    const { view } = useContext(AppContext);

    const renderView = () => {
        switch (view) {
            case AppView.LANDING:
                return <Landing />;
            case AppView.ONBOARDING_GOALS:
                return <OnboardingGoals />;
            case AppView.ONBOARDING_HABITS:
                return <OnboardingHabits />;
            case AppView.DASHBOARD:
                return <Dashboard />;
            case AppView.STATS:
                return <Stats />;
            case AppView.PROGRAMS:
                return <Programs />;
            case AppView.ACCOUNT:
                return <Account />;
            case AppView.UPGRADE:
                return <Upgrade />;
            default:
                return <Landing />;
        }
    };

    return <div className="min-h-screen font-sans text-gray-800">{renderView()}</div>;
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
