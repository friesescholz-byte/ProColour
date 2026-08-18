/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5E1E',
          'orange-glow': '#FF7A45',
          'orange-dark': '#E04808',
          yellow: '#F59E0B',
          'yellow-light': '#FCD34D',
        },
        dark: {
          950: '#05080E',
          900: '#090E17',
          850: '#0F1624',
          800: '#151F33',
          700: '#212E4A',
          600: '#34466B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px -10px rgba(255, 94, 30, 0.2)',
        'glow-orange': '0 0 35px -5px rgba(255, 94, 30, 0.5)',
        'glow-subtle': '0 0 50px -10px rgba(245, 158, 11, 0.25)',
      },
      backgroundImage: {
        'radial-gradient-orange': 'radial-gradient(circle at 50% 0%, rgba(255, 94, 30, 0.2), transparent 70%)',
      }
    },
  },
  plugins: [],
}
