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
        'cormorant': ['Cormorant Garamond', 'serif'],
        'lato': ['Lato', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        // Warm Burgundy-Wine palette (from logo dark end)
        evergreen: {
          50: '#faf5f0',
          100: '#f0e4db',
          200: '#dfc4b3',
          300: '#c9a08a',
          400: '#b07a62',
          500: '#935a42',
          600: '#784436',
          700: '#5c332a',
          800: '#482420', // Primary Dark Wine
          900: '#381a16',
        },
        // Warm Ivory/Cream (matches logo text)
        cream: {
          50: '#faf7f2', // Primary Creamy White
          100: '#f5efe6',
          200: '#ebe0d3',
          300: '#ddd0be',
          400: '#ccbba4',
          500: '#b8a288',
          600: '#a08a6e',
          700: '#876f56',
          800: '#6e5a46',
          900: '#5a4938',
        },
        // Golden-Copper accent (from logo warm end)
        pink: {
          50: '#faf0e0',
          100: '#f2dfc0',
          200: '#e6c898',
          300: '#d6ac6c',
          400: '#c49444', // Primary Golden Accent
          500: '#a67c36',
          600: '#88642c',
          700: '#6a4e22',
          800: '#503c1a',
          900: '#3a2c14',
        },
        // Legacy colors for compatibility
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
        'cinematic-zoom': 'cinematicZoom 30s ease-in-out infinite',
        'story-reveal': 'storyReveal 1.2s ease-out',
        'timeline-pulse': 'timelinePulse 2s ease-in-out infinite',
        'magnetic-float': 'magneticFloat 6s ease-in-out infinite',
        'parallax-slow': 'parallaxSlow 40s ease-in-out infinite',
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
        'cinematicZoom': {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.15) translateY(-2%)' },
        },
        'storyReveal': {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'timelinePulse': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        'magneticFloat': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
        },
        'parallaxSlow': {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.08) translateY(-1%)' },
        },
      },
      backgroundImage: {
        'cinematic-gradient': 'linear-gradient(135deg, rgba(72, 36, 32, 0.9) 0%, rgba(72, 36, 32, 0.6) 50%, rgba(72, 36, 32, 0.8) 100%)',
        'story-gradient': 'linear-gradient(180deg, transparent 0%, rgba(72, 36, 32, 0.7) 70%, rgba(72, 36, 32, 0.9) 100%)',
        'timeline-gradient': 'linear-gradient(90deg, rgba(250, 247, 242, 0) 0%, rgba(250, 247, 242, 0.8) 50%, rgba(250, 247, 242, 0) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
        'cinematic': '12px',
      },
    },
  },
  plugins: [],
};

export default config; 