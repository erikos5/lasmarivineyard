import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        olive: {
          50: '#f7f8f5',
          100: '#eef0ea',
          200: '#dce1d5',
          300: '#c4ccb8',
          400: '#a7b295',
          500: '#8a9775',
          600: '#6f7c5c',
          700: '#5a634a',
          800: '#4a523e',
          900: '#233524',
        },
        cream: {
          50: '#fefaf1',
          100: '#fdf5e6',
          200: '#fbebc7',
          300: '#f8dda3',
          400: '#f4ca6d',
          500: '#f0b647',
          600: '#e19d2c',
          700: '#bc7d24',
          800: '#966325',
          900: '#7a5123',
        },
        burgundy: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f9d3d3',
          300: '#f4b1b1',
          400: '#ec8585',
          500: '#e15d5d',
          600: '#cc3f3f',
          700: '#ab3333',
          800: '#8e2e2e',
          900: '#622222',
        },
      },
      transitionTimingFunction: {
        'ease-out-cubic': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 