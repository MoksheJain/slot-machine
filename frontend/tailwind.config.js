/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E3',
          100: '#F5E9C3',
          200: '#EFD9A0',
          300: '#E5C777',
          400: '#D4AF37',
          500: '#B8941F',
          600: '#927415',
          700: '#6B5410',
          800: '#47380B',
          900: '#2A2107',
        },
        champagne: {
          DEFAULT: '#F5D98B',
          light: '#FAEAB0',
          dark: '#D4BE6A',
        },
        'muted-gold': {
          DEFAULT: '#B8A66B',
          light: '#C9B97F',
          dark: '#9A8A52',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5D98B 50%, #D4AF37 100%)',
      },
    },
  },
  plugins: [],
};
