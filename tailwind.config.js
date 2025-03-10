/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Semantic Colors for Gruvbox Dark Theme
        gruvboxDark: {
          primary: '#458588', // Blue
          secondary: '#d79921', // Yellow
          background: '#282828', // Background
          foreground: '#ebdbb2', // Foreground
          error: '#cc241d', // Red
          success: '#98971a', // Green
          warning: '#d65d0e', // Orange
          info: '#689d6a', // Aqua
        },
        // Semantic Colors for Gruvbox Light Theme
        gruvboxLight: {
          primary: '#458588', // Blue
          secondary: '#d79921', // Yellow
          background: '#fbf1c7', // Background
          foreground: '#3c3836', // Foreground
          error: '#cc241d', // Red
          success: '#98971a', // Green
          warning: '#d65d0e', // Orange
          info: '#689d6a', // Aqua
        },
      },
    },
  },
  plugins: [],
};
