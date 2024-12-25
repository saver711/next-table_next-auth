import type { Config } from 'tailwindcss';

var COLORS = {
  primary: {
    400: '#fff4f0',
    500: '#ffe5dd',
    600: '#fd8f69',
    700: '#f2851b',
    800: '#fc551b',
    900: '#ed4c14',
    blue: { 900: '#312d39' },
  },
  gray: {
    400: '#999999',
    500: '#eeeeee',
    600: '#98a2b3',
    700: '#667085',
    800: '#475467',
    900: '#474747',
    'filled-input': '#303030',
  },
  error: {
    500: '#fee4e2',
    700: '#d92d20',
    800: '#b42318',
  },
  warning: {
    500: '#ffecda',
    600: '#fec84b',
    700: '#fdb022',
    900: '#ffdb2f',
  },
  success: {
    500: '#daf5e3',
    700: '#12b76a',
    800: '#027a48',
  },
  info: {
    500: '#dbf6ff',
    700: '#00b4d8',
    800: '#0096c7',
  },
  secondary: {
    shade: '#1c4162',
    blue: { 200: '#ecedfa', 900: '#142d44' },
    cyan: { 900: '#8bced7' },
    red: { 900: '#a0483e' },
    yellow: { 500: '#f4d2a0' },
  },
};
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: COLORS,
      boxShadow: {
        input: '0 0 0 1.4px #333',
      },
    },
    screens: {
      xs: '450px',
      // Below 743 => Mobile
      sm: '743px', // (743px : 1364) => Tablet
      md: '1270px', // (1270 : 1918) => Desktop
      lg: '1919px', // Greater than 1918 => Desktop and Bigger
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
