import { FontFamilyIcon } from '@radix-ui/react-icons';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/common/DatePicker/CustomDatePicker.css',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-guide': 'rgba(81, 251, 86, 0.08)',
        'list-box': 'rgba(0, 255, 0, 0.10)',
        'intro-box': 'rgba(0, 255, 0, 0.08)',
        'intro-span': 'rgba(0, 255, 0, 0.20)',
        map: 'rgba(0, 255, 0, 0.23)',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(180deg, #000 0%, #000 60.1%, #FFF 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        C1: 'var(--C1, #FFF)',
        main: '#0F0',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        neurimbo: ['neurimboGothicRegular'],
        pretendard: ['Pretendard-Regular'],
        cafe24: ['Cafe24ClassicType-Regular'],
        'gmarket-sans': ['"Gmarket Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
