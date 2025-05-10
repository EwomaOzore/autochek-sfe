/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5',
          dark: '#818CF8',
        },
        secondary: {
          light: '#0EA5E9',
          dark: '#38BDF8',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
        card: {
          light: '#F9FAFB',
          dark: '#374151',
        },
        text: {
          light: '#1F2937',
          dark: '#F9FAFB',
        }
      },
    },
  },
  plugins: [],
}