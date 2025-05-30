// src/hooks/useBackgroundElements.js
import { useRef, useEffect } from 'react';

export const useBackgroundElements = (timeOfDay, HOLIDAY_THEME) => {
  const starsRef = useRef(null);
  const cloudsRef = useRef(null);
  const buildingsRef = useRef(null);
  const celestialBodyRef = useRef(null);
  const holidayElementsRef = useRef(null);

  // Generate stars for night mode
  useEffect(() => {
    if (timeOfDay === 'night' && !starsRef.current) {
      const stars = [];
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 3 + 1;
        const animationDelay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = 3 + Math.random() * 4;

        stars.push(
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${animationDuration}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        );
      }

      // Add shooting stars
      for (let i = 0; i < 5; i++) {
        const top = Math.random() * 50;
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 15;

        stars.push(
          <div
            key={`shooting-${i}`}
            className="absolute h-0.5 w-0.5 bg-white animate-shooting-star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${animationDelay}s`,
            }}
          />
        );
      }

      starsRef.current = stars;
    } else if (timeOfDay !== 'night') {
      starsRef.current = null;
    }
  }, [timeOfDay]);

  // Generate clouds
  useEffect(() => {
    if (timeOfDay !== 'night' && !cloudsRef.current) {
      const clouds = [];
      const count = timeOfDay === 'day' ? 8 : timeOfDay === 'morning' ? 6 : 4;

      for (let i = 0; i < count; i++) {
        const width = Math.random() * 150 + 100;
        const initialLeft = Math.random() * 100;
        const animationDuration = Math.random() * 200 + 100;
        const top = Math.random() * 60;
        const animationDelay = -(initialLeft / 100) * animationDuration;

        clouds.push(
          <div
            key={i}
            className={`absolute rounded-full animate-float-cloud ${
              timeOfDay === 'morning' 
                ? 'bg-orange-200/40' 
                : timeOfDay === 'day' 
                ? 'bg-white/60' 
                : 'bg-pink-200/50'
            }`}
            style={{
              width: `${width}px`,
              height: `${width / 2}px`,
              top: `${top}%`,
              left: `${initialLeft}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
            }}
          />
        );
      }

      cloudsRef.current = clouds;
    } else if (timeOfDay === 'night') {
      cloudsRef.current = null;
    }
  }, [timeOfDay]);

  // Generate celestial body
  useEffect(() => {
    if (timeOfDay === 'morning') {
      celestialBodyRef.current = (
        <div className="absolute left-1/4 top-1/4 w-24 h-24 rounded-full bg-yellow-300 animate-gentle-float blur-md"></div>
      );
    } else if (timeOfDay === 'day') {
      celestialBodyRef.current = (
        <div className="absolute right-1/4 top-1/6 w-32 h-32 rounded-full bg-yellow-300 animate-gentle-float blur-sm"></div>
      );
    } else if (timeOfDay === 'evening') {
      celestialBodyRef.current = (
        <div className="absolute right-1/4 bottom-1/4 w-28 h-28 rounded-full bg-orange-500 animate-gentle-float blur-md"></div>
      );
    } else if (timeOfDay === 'night') {
      celestialBodyRef.current = (
        <div className="absolute right-1/4 top-1/6 w-16 h-16 rounded-full bg-gray-100 animate-gentle-float blur-[1px]"></div>
      );
    }
  }, [timeOfDay]);

  // Generate buildings
  useEffect(() => {
    if (!buildingsRef.current) {
      const buildings = [];
      const count = 8;

      for (let i = 0; i < count; i++) {
        const width = 40 + Math.random() * 60;
        const height = 100 + Math.random() * 150;
        const left = (i / count) * 100;

        const buildingColor =
          timeOfDay === 'night'
            ? 'bg-gray-900'
            : timeOfDay === 'evening'
              ? 'bg-gray-700'
              : timeOfDay === 'morning'
                ? 'bg-gray-500'
                : 'bg-gray-600';

        const windowColor =
          timeOfDay === 'night'
            ? 'bg-yellow-100 opacity-80'
            : timeOfDay === 'evening'
              ? 'bg-orange-100 opacity-60'
              : timeOfDay === 'morning'
                ? 'bg-blue-100 opacity-40'
                : 'bg-white opacity-70';

        const windows = [];
        const floors = Math.floor(height / 20);
        const windowsPerFloor = Math.floor(width / 20);

        for (let floorIndex = 0; floorIndex < floors; floorIndex++) {
          const floorWindows = [];
          for (let windowIndex = 0; windowIndex < windowsPerFloor; windowIndex++) {
            if (Math.random() > (timeOfDay === 'night' ? 0.3 : 0.5)) {
              floorWindows.push(<div key={windowIndex} className={`w-3 h-4 ${windowColor}`} />);
            } else {
              floorWindows.push(<div key={windowIndex} className="w-3 h-4 opacity-0" />);
            }
          }
          windows.push(
            <div key={floorIndex} className="flex justify-around mt-4">
              {floorWindows}
            </div>
          );
        }

        buildings.push(
          <div
            key={i}
            className={`absolute bottom-0 ${buildingColor}`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              left: `${left}%`,
            }}
          >
            {windows}
            <div
              className={`absolute -top-5 left-0 right-0 h-5 ${
                timeOfDay === 'night' ? 'bg-gray-800' : timeOfDay === 'evening' ? 'bg-gray-600' : 'bg-gray-400'
              }`}
              style={{
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              }}
            ></div>
          </div>
        );
      }

      buildingsRef.current = buildings;
    }
  }, [timeOfDay]);

  // Generate holiday elements
  useEffect(() => {
    if (HOLIDAY_THEME === 'christmas') {
      const christmasElements = [];

      // Add snow
      for (let i = 0; i < 50; i++) {
        christmasElements.push(
          <div
            key={`snow-${i}`}
            className="absolute rounded-full bg-white animate-snow"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `-20px`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        );
      }

      // Add Christmas tree
      christmasElements.push(
        <div key="christmas-tree" className="absolute bottom-0 left-1/4 z-10" style={{ transform: 'translateX(-50%)' }}>
          <div className="w-6 h-10 bg-yellow-800 mx-auto"></div>
          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-green-800 relative -mt-5">
            <div className="absolute w-3 h-3 rounded-full bg-red-500 top-10 left-0"></div>
            <div className="absolute w-3 h-3 rounded-full bg-yellow-300 top-20 right-2"></div>
            <div className="absolute w-3 h-3 rounded-full bg-blue-400 top-15 left-5"></div>
          </div>
          <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[50px] border-l-transparent border-r-transparent border-b-green-700 relative -mt-10">
            <div className="absolute w-3 h-3 rounded-full bg-purple-500 top-20 right-0"></div>
            <div className="absolute w-3 h-3 rounded-full bg-blue-300 top-30 left-2"></div>
          </div>
          <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[60px] border-l-transparent border-r-transparent border-b-green-600 relative -mt-15">
            <div className="absolute w-3 h-3 rounded-full bg-red-400 top-20 left-0"></div>
            <div className="absolute w-3 h-3 rounded-full bg-yellow-400 top-40 right-5"></div>
          </div>
          <div
            className="w-8 h-8 bg-yellow-300 absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse-slow"
            style={{
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
          ></div>
        </div>
      );

      holidayElementsRef.current = christmasElements;
    } else if (HOLIDAY_THEME === 'halloween') {
      const halloweenElements = [];

      // Add bats
      for (let i = 0; i < 10; i++) {
        const size = Math.random() * 10 + 10;
        halloweenElements.push(
          <div
            key={`bat-${i}`}
            className="absolute animate-bat"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="bg-black"
              style={{
                width: `${size}px`,
                height: `${size / 2}px`,
                borderRadius: '50% 50% 0 0',
                position: 'relative',
              }}
            >
              <div
                className="absolute bg-black animate-bat-wing"
                style={{
                  width: `${size * 1.5}px`,
                  height: `${size}px`,
                  borderRadius: '50% 50% 0 50%',
                  transform: 'rotate(-20deg)',
                  transformOrigin: 'bottom right',
                  left: `-${size}px`,
                  top: `-${size / 2}px`,
                }}
              ></div>
              <div
                className="absolute bg-black animate-bat-wing-reverse"
                style={{
                  width: `${size * 1.5}px`,
                  height: `${size}px`,
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(20deg)',
                  transformOrigin: 'bottom left',
                  right: `-${size}px`,
                  top: `-${size / 2}px`,
                }}
              ></div>
            </div>
          </div>
        );
      }

      // Add pumpkins
      halloweenElements.push(
        <div key="pumpkins" className="absolute bottom-0 left-0 right-0 z-10">
          {Array.from({ length: 5 }).map((_, i) => {
            const left = 10 + i * 20;
            const size = 20 + Math.random() * 15;
            return (
              <div
                key={i}
                className="absolute bottom-0 animate-pulse-slow"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size * 0.8}px`,
                }}
              >
                <div
                  className="w-full h-full rounded-full bg-orange-500"
                  style={{
                    boxShadow: '0 0 10px 2px rgba(255, 165, 0, 0.3)',
                  }}
                >
                  <div className="absolute w-3 h-5 bg-green-800 top-0 left-1/2 transform -translate-x-1/2 -translate-y-3"></div>
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
                    <div
                      className="absolute top-0 left-0 w-3 h-3 bg-black"
                      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-3 h-3 bg-black"
                      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-1/4 w-1/2 h-3 bg-black"
                      style={{ clipPath: 'polygon(0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%)' }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );

      // Add orange/purple overlay
      halloweenElements.push(
        <div
          key="halloween-overlay"
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-orange-700/10 pointer-events-none"
        ></div>
      );

      // Add moon with orange tint
      halloweenElements.push(
        <div
          key="halloween-moon"
          className="absolute right-1/4 top-1/6 w-16 h-16 rounded-full bg-yellow-100 animate-gentle-float blur-[1px]"
          style={{ boxShadow: '0 0 20px 10px rgba(255, 165, 0, 0.2)' }}
        ></div>
      );

      holidayElementsRef.current = halloweenElements;
    } else {
      holidayElementsRef.current = null;
    }
  }, [timeOfDay, HOLIDAY_THEME]);

  return {
    stars: starsRef.current,
    clouds: cloudsRef.current,
    buildings: buildingsRef.current,
    celestialBody: celestialBodyRef.current,
    holidayElements: holidayElementsRef.current,
  };
};