/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Exo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        hud: {
          void: '#050510',
          base: '#080d1a',
          surface: '#0f172a',
          panel: '#111c33',
          border: '#1e293b',
          borderGlow: '#06b6d4',
          cyan: '#00f7ff',
          teal: '#14b8a6',
          violet: '#8b5cf6',
          purple: '#a855f7',
          rose: '#f43f5e',
          amber: '#f59e0b',
          emerald: '#10b981',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 247, 255, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scan 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
