import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePersonalization } from '../hooks/usePersonalization';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
}

const contentDatabase: ContentItem[] = [
  {
    id: 'ai-basics',
    title: 'AI Fundamentals',
    description: 'Master the basics of AI implementation in your workflow',
    category: 'learning',
    path: '/guides/ai-basics'
  },
  {
    id: 'chatgpt-pro',
    title: 'ChatGPT Pro Tips',
    description: 'Advanced techniques for ChatGPT optimization',
    category: 'productivity',
    path: '/guides/chatgpt-pro'
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks with AI',
    category: 'automation',
    path: '/guides/workflow-automation'
  }
];

const RecommendedContent: React.FC = () => {
  const { preferences, updatePreferredContent } = usePersonalization();

  const getRecommendedContent = (): ContentItem[] => {
    if (!preferences.interests.length) return contentDatabase.slice(0, 3);

    return contentDatabase
      .filter(item => preferences.interests.includes(item.category))
      .slice(0, 3);
  };

  const handleContentClick = (contentId: string) => {
    updatePreferredContent(contentId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        Recommended for You
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getRecommendedContent().map((item) => (
          <div
            key={item.id}
            className="neo-card p-6 rounded-xl hover:transform hover:scale-[1.02] transition-transform duration-300"
          >
            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
            <p className="text-text-secondary mb-4">{item.description}</p>
            <button
              onClick={() => handleContentClick(item.id)}
              className="neo-btn text-primary px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedContent;