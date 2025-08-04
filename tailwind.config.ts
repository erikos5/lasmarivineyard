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
        // New Cinematic Color Palette
        evergreen: {
          50: '#f0f4f1',
          100: '#dce7de',
          200: '#b8d0bd',
          300: '#8fb197',
          400: '#689371',
          500: '#4d7455',
          600: '#3d5c43',
          700: '#334a37',
          800: '#2e3b29', // Primary Dark Evergreen
          900: '#252f22',
        },
        cream: {
          50: '#f9f7f4', // Primary Creamy White
          100: '#f3f0ec',
          200: '#e8e3db',
          300: '#d9d1c4',
          400: '#c8baa8',
          500: '#b6a18a',
          600: '#a08970',
          700: '#87725c',
          800: '#6f5e4e',
          900: '#5c4e41',
        },
        pink: {
          50: '#f6e8e8', // Primary Soft Pink Tint
          100: '#f0d4d4',
          200: '#e5b3b3',
          300: '#d98c8c',
          400: '#cc6565',
          500: '#bf4242',
          600: '#a53535',
          700: '#8a2c2c',
          800: '#702424',
          900: '#591e1e',
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
        'cinematic-gradient': 'linear-gradient(135deg, rgba(46, 59, 41, 0.9) 0%, rgba(46, 59, 41, 0.6) 50%, rgba(46, 59, 41, 0.8) 100%)',
        'story-gradient': 'linear-gradient(180deg, transparent 0%, rgba(46, 59, 41, 0.7) 70%, rgba(46, 59, 41, 0.9) 100%)',
        'timeline-gradient': 'linear-gradient(90deg, rgba(249, 247, 244, 0) 0%, rgba(249, 247, 244, 0.8) 50%, rgba(249, 247, 244, 0) 100%)',
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