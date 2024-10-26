import { useState, useEffect } from 'react';

interface UserPreferences {
  interests: string[];
  visitCount: number;
  lastVisit: string;
  preferredContent: string[];
}

export const usePersonalization = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    visitCount: 0,
    lastVisit: '',
    preferredContent: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem('user_preferences');
        if (stored) {
          setPreferences(JSON.parse(stored));
        }
        
        // Update visit count and last visit
        const updatedPreferences = {
          ...preferences,
          visitCount: (preferences.visitCount || 0) + 1,
          lastVisit: new Date().toISOString()
        };
        
        setPreferences(updatedPreferences);
        localStorage.setItem('user_preferences', JSON.stringify(updatedPreferences));
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updateInterests = (newInterests: string[]) => {
    const updatedPreferences = {
      ...preferences,
      interests: [...new Set([...preferences.interests, ...newInterests])]
    };
    setPreferences(updatedPreferences);
    localStorage.setItem('user_preferences', JSON.stringify(updatedPreferences));
  };

  const updatePreferredContent = (contentId: string) => {
    const updatedContent = [contentId, ...preferences.preferredContent].slice(0, 10);
    const updatedPreferences = {
      ...preferences,
      preferredContent: updatedContent
    };
    setPreferences(updatedPreferences);
    localStorage.setItem('user_preferences', JSON.stringify(updatedPreferences));
  };

  return {
    preferences,
    loading,
    updateInterests,
    updatePreferredContent
  };
};