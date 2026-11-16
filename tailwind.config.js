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
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        lab: {
          bg: '#0b0f19',
          surface: '#111827',
          panel: '#151f32',
          border: '#1f293d',
          blue: '#2563eb',
          sky: '#0284c7',
          teal: '#0d9488',
          emerald: '#059669',
          rose: '#e11d48',
          amber: '#d97706',
          slate: '#64748b',
        },
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
