'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Music, Headphones, Mic, User, Heart } from 'lucide-react';

// Define the question structure
interface Question {
  id: string;
  question: string;
  options: { id: string; label: string; icon?: React.ReactNode }[];
}

interface Recommendation {
  title: string;
  type: string;
  description: string;
  gradient: string;
}

// Sample questions for onboarding
const questions: Question[] = [
  {
    id: 'preferred_genres',
    question: 'What types of Haitian music do you enjoy?',
    options: [
      { id: 'kompa', label: 'Kompa', icon: <Music className="h-5 w-5" /> },
      { id: 'rasin', label: 'Rasin (Roots)', icon: <Music className="h-5 w-5" /> },
      { id: 'rap_kreyol', label: 'Rap Kreyòl', icon: <Mic className="h-5 w-5" /> },
      { id: 'twoubadou', label: 'Twoubadou', icon: <Headphones className="h-5 w-5" /> },
      { id: 'zouk', label: 'Zouk', icon: <Music className="h-5 w-5" /> },
      { id: 'rara', label: 'Rara', icon: <Music className="h-5 w-5" /> },
    ],
  },
  {
    id: 'favorite_artists',
    question: 'Which artists are you interested in?',
    options: [
      { id: 'boukman', label: 'Boukman Eksperyans', icon: <User className="h-5 w-5" /> },
      { id: 'tabou', label: 'Tabou Combo', icon: <User className="h-5 w-5" /> },
      { id: 'sweet_micky', label: 'Sweet Micky', icon: <User className="h-5 w-5" /> },
      { id: 'ram', label: 'RAM', icon: <User className="h-5 w-5" /> },
      { id: 'carimi', label: 'Carimi', icon: <User className="h-5 w-5" /> },
      { id: 'harmonik', label: 'Harmonik', icon: <User className="h-5 w-5" /> },
    ],
  },
  {
    id: 'listening_preference',
    question: 'How do you prefer to discover music?',
    options: [
      { id: 'playlists', label: 'Curated Playlists', icon: <Music className="h-5 w-5" /> },
      { id: 'artists', label: 'Artist Recommendations', icon: <User className="h-5 w-5" /> },
      { id: 'popular', label: 'Popular Hits', icon: <Heart className="h-5 w-5" /> },
      { id: 'discovery', label: 'New Discoveries', icon: <Music className="h-5 w-5" /> },
    ],
  },
];

export default function RecommendationsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [completed, setCompleted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // For demonstration purposes - recommendations based on selections
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle option selection
  const handleSelect = (questionId: string, optionId: string) => {
    setSelections(prev => {
      const current = prev[questionId] || [];
      if (current.includes(optionId)) {
        return {
          ...prev,
          [questionId]: current.filter(id => id !== optionId),
        };
      } else {
        return {
          ...prev,
          [questionId]: [...current, optionId],
        };
      }
    });
  };

  // Handle navigation between questions
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate recommendations based on selections
      generateRecommendations();
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Generate recommendations based on user selections
  const generateRecommendations = () => {
    // For demo purposes - in a real app, this would call an API
    const sampleRecommendations = [
      {
        title: 'Kompa Favorites',
        type: 'playlist',
        description: 'The best of modern Kompa music',
        gradient: 'from-haiti-blue to-purple-600',
      },
      {
        title: 'Rasin Roots',
        type: 'playlist',
        description: 'Explore the traditional sounds of Haiti',
        gradient: 'from-haiti-red to-haiti-gold',
      },
      {
        title: 'Boukman Eksperyans',
        type: 'artist',
        description: 'Legendary Mizik Rasin band',
        gradient: 'from-green-600 to-blue-600',
      },
      {
        title: 'Haiti Dance Party',
        type: 'playlist',
        description: 'High-energy tracks for celebration',
        gradient: 'from-orange-500 to-pink-600',
      },
    ];

    setRecommendations(sampleRecommendations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-white flex items-center gap-2 mb-8">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-haiti-red to-haiti-blue bg-clip-text text-transparent">
            {completed ? 'Your Music Universe' : 'Let\'s Get to Know You'}
          </h1>
          <p className="text-white/70 mb-8">
            {completed
              ? 'Based on your preferences, we\'ve curated these recommendations just for you.'
              : 'Help us understand your musical tastes to create a personalized experience.'}
          </p>
        </motion.div>

        {!completed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {/* Progress indicator */}
            <div className="flex mb-8">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 mx-1 rounded-full ${
                    idx <= currentQuestion
                      ? 'bg-gradient-to-r from-haiti-blue to-haiti-red'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Current question */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {questions[currentQuestion].options.map((option) => {
                  const isSelected = selections[questions[currentQuestion].id]?.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(questions[currentQuestion].id, option.id)}
                      className={`p-4 rounded-lg text-white flex flex-col items-center text-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-haiti-red/80 to-haiti-blue/80 border-2 border-haiti-gold'
                          : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          isSelected ? 'bg-haiti-gold text-haiti-blue' : 'bg-white/10 text-white'
                        }`}
                      >
                        {isSelected ? <Check className="h-6 w-6" /> : option.icon}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="text-white border-white/20"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <Button
                className="bg-gradient-to-r from-haiti-blue to-haiti-red text-white"
                onClick={handleNext}
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`bg-gradient-to-br ${item.gradient} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
                >
                  <Link href={item.type === 'playlist' ? '/playlist/1' : '/artist/1'} className="block h-full">
                    <div className="flex flex-col h-full">
                      <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm mb-4">
                        {item.type === 'playlist' ? (
                          <Music className="h-6 w-6 text-white" />
                        ) : (
                          <User className="h-6 w-6 text-white" />
                        )}
                      </div>
                      
                      <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/80 mb-4">{item.description}</p>
                      
                      <div className="mt-auto text-white text-sm font-medium flex items-center">
                        <span>{item.type === 'playlist' ? 'Play now' : 'View artist'}</span>
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-haiti-blue to-haiti-red text-white px-8 py-6 text-lg rounded-full">
                  Explore Your Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}