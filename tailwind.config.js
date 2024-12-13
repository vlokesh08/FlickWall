/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<custom-path>/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          DEFAULT: '#16a34a', // green-600
          light: '#22c55e',   // green-500
          dark: '#15803d',    // green-700
        },
        background: {
          DEFAULT: '#ffffff', // white
          secondary: '#f9fafb', // gray-50
        },
        text: {
          DEFAULT: '#111827', // gray-900
          secondary: '#4b5563', // gray-600
        },
        button: {
          primary: {
            DEFAULT: '#2575fc', // green-500
            light: '#4ade80',   // green-400
            dark: '#16a34a',    // green-600
          },
          secondary: {
            DEFAULT: '#f9fafb', // gray-50
            light: '#f3f4f6',   // gray-100
            dark: '#e5e7eb',    // gray-200
          },
        },
        // Dark theme colors
        dark: {
          primary: {
            DEFAULT: '#22c55e', // green-500
            light: '#4ade80',   // green-400
            dark: '#16a34a',    // green-600
          },
          background: {
            DEFAULT: '#111827', // gray-900
            secondary: '#1f2937', // gray-800
          },
          text: {
            DEFAULT: '#ffffff', // white
            secondary: '#9ca3af', // gray-400
          },
        },
      },
    },
  },
  plugins: [],
}