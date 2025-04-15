import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('turquoise');

  const themes = {
    dark: {
      primary: 'deepViolet',
      secondary: 'lavender',
      accent: accentColor,
      background: 'bg-deepViolet',
      text: 'text-white',
      border: 'border-lavender/20'
    },
    light: {
      primary: 'white',
      secondary: 'gray-800',
      accent: accentColor,
      background: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-200'
    }
  };

  const accentColors = {
    turquoise: {
      primary: 'bg-turquoise',
      secondary: 'bg-turquoise/20',
      text: 'text-turquoise',
      border: 'border-turquoise/20'
    },
    lavender: {
      primary: 'bg-lavender',
      secondary: 'bg-lavender/20',
      text: 'text-lavender',
      border: 'border-lavender/20'
    },
    purple: {
      primary: 'bg-purple-500',
      secondary: 'bg-purple-500/20',
      text: 'text-purple-500',
      border: 'border-purple-500/20'
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const setAccent = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedAccent = localStorage.getItem('accentColor') || 'turquoise';
    
    setTheme(savedTheme);
    setAccentColor(savedAccent);
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themes,
        accentColor,
        accentColors,
        toggleTheme,
        setAccent
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 