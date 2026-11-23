/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#1e293b',
          850: '#151f32',
          900: '#0f172a',
          950: '#020617',
        },
        brand: {
          cyan: '#00D2FF',
          purple: '#7B2CBF',
          magenta: '#F72585',
          sky: '#4CC9F0',
          violet: '#B5179E',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 210, 255, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(123, 44, 191, 0.4)',
        'glow-magenta': '0 0 25px -5px rgba(247, 37, 133, 0.4)',
      }
    },
  },
  plugins: [],
}
