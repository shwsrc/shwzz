import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import CardCarousel from './components/CardCarousel';
import RevealButton from './components/RevealButton';
import LoadingIndicator from './components/LoadingIndicator';
import { DISCORD_USER_IDS } from './utils/constants';
import { LanyardResponse } from './types/lanyard';

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [lanyardData, setLanyardData] = useState<LanyardResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (!isRevealed) return;

    const fetchUserData = async (id: string, retries = 2): Promise<LanyardResponse | null> => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const response = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error(`User ${id} not found`);
            }
            throw new Error(`Server responded with ${response.status}`);
          }
          return await response.json();
        } catch (err) {
          if (attempt === retries) {
            throw err;
          }
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
      return null;
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      const newErrors = new Map<string, string>();
      const results: LanyardResponse[] = [];

      await Promise.all(
        DISCORD_USER_IDS.map(async (id) => {
          try {
            const data = await fetchUserData(id);
            if (data) {
              results.push(data);
            }
          } catch (err) {
            console.error(`Error fetching data for user ${id}:`, err);
            newErrors.set(id, `Failed to load data for user ${id}`);
          }
        })
      );

      setLanyardData(results);
      setErrors(newErrors);
      setIsLoading(false);
    };

    fetchAllData();
  }, [isRevealed]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Background isRevealed={isRevealed} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <RevealButton onClick={handleReveal} isRevealed={isRevealed} />
          
          {isRevealed && (
            <div className="w-full">
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <CardCarousel data={lanyardData} isRevealed={isRevealed} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App