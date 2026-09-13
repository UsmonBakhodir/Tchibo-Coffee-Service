export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tchibo: {
          red: '#C8102E',
          cream: '#FAF7F2',
          beige: '#E8DDD0',
          dark: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
};
