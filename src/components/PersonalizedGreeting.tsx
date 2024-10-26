import React from 'react';
import { usePersonalization } from '../hooks/usePersonalization';

const getGreeting = (hour: number): string => {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const getPersonalizedMessage = (visitCount: number): string => {
  if (visitCount === 1) return "Welcome to AI Transform!";
  if (visitCount < 5) return "Welcome back!";
  return "Great to see you again!";
};

const PersonalizedGreeting: React.FC = () => {
  const { preferences, loading } = usePersonalization();
  const hour = new Date().getHours();

  if (loading) return null;

  return (
    <div className="neo-card p-4 rounded-lg mb-8 bg-opacity-50">
      <h2 className="text-xl font-semibold mb-2">
        {getGreeting(hour)}, {getPersonalizedMessage(preferences.visitCount)}
      </h2>
      {preferences.interests.length > 0 && (
        <p className="text-text-secondary">
          Ready to explore more about{' '}
          {preferences.interests.slice(0, 2).join(' and ')}?
        </p>
      )}
    </div>
  );
};

export default PersonalizedGreeting;