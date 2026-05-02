/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.15) 0%, transparent 50%)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'slide-up':   'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fadeIn 0.8s ease-out forwards',
        'shimmer':    'shimmer 3s linear infinite',
        'glow':       'glow 2s ease-in-out infinite alternate',
        'spin-slow':  'spin 8s linear infinite',
        'aurora':     'aurora 14s ease-in-out infinite alternate',
        'aurora-2':   'aurora2 18s ease-in-out infinite alternate',
        'aurora-3':   'aurora3 22s ease-in-out infinite alternate',
        'gradient-x': 'gradientX 6s ease infinite',
        'blink':      'blink 1s step-end infinite',
        'ping-slow':  'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'beam':       'beam 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(40px)', opacity: '0', filter: 'blur(8px)' },
          '100%': { transform: 'translateY(0)',    opacity: '1', filter: 'blur(0px)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 20px rgba(6,182,212,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(6,182,212,0.7), 0 0 80px rgba(99,102,241,0.3)' },
        },
        aurora: {
          '0%':   { transform: 'translate(0%,    0%)    scale(1)',    opacity: '0.5' },
          '33%':  { transform: 'translate(6%,   -6%)    scale(1.08)', opacity: '0.75' },
          '66%':  { transform: 'translate(-4%,   4%)    scale(0.94)', opacity: '0.6' },
          '100%': { transform: 'translate(3%,   -3%)    scale(1.04)', opacity: '0.5' },
        },
        aurora2: {
          '0%':   { transform: 'translate(0%,    0%)    scale(1.05)', opacity: '0.4' },
          '40%':  { transform: 'translate(-7%,   5%)    scale(0.92)', opacity: '0.65' },
          '80%':  { transform: 'translate(5%,   -3%)    scale(1.1)',  opacity: '0.45' },
          '100%': { transform: 'translate(-2%,   2%)    scale(1)',    opacity: '0.4' },
        },
        aurora3: {
          '0%':   { transform: 'translate(0%,    0%)    scale(1)',    opacity: '0.3' },
          '50%':  { transform: 'translate(4%,    6%)    scale(1.12)', opacity: '0.5' },
          '100%': { transform: 'translate(-5%,  -3%)    scale(0.96)', opacity: '0.3' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        beam: {
          '0%':   { transform: 'translateX(-100%) skewX(-12deg)', opacity: '0' },
          '40%':  { opacity: '1' },
          '60%':  { opacity: '1' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)',  opacity: '0' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}