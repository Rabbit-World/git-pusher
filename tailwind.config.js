/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub color palette
        'github-dark': '#0d1117',
        'github-darker': '#010409',
        'github-light': '#f6f8fa',
        'github-border': '#30363d',
        'github-text': '#c9d1d9',
        'github-link': '#58a6ff',
        'github-btn': '#238636',
        'github-btn-hover': '#2ea043',
        'github-header': '#161b22',
        'github-accent': '#f78166',
        'github-yellow': '#f1e05a',
        'github-purple': '#8957e5',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
    },
  },
  plugins: [],
}