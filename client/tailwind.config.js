/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amazon: {
          yellow: '#FF9900',
          'yellow-hover': '#e68a00',
          dark: '#131921',
          blue: '#232F3E',
          'light-blue': '#37475A',
          orange: '#FF9900',
        },
      },
    },
  },
  plugins: [],
};
