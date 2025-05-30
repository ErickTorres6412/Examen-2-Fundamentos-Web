// src/hooks/useTimeOfDay.js
import { useState, useEffect } from 'react';

export const useTimeOfDay = () => {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const determineTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) {
        setTimeOfDay('morning');
      } else if (hour >= 11 && hour < 17) {
        setTimeOfDay('day');
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay('evening');
      } else {
        setTimeOfDay('night');
      }
    };

    determineTimeOfDay();
    // Update time of day every minute
    const interval = setInterval(determineTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
};