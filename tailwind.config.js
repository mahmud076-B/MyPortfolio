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
        'bg-primary': {
          DEFAULT: '#0a0a0f',
          light: '#f8fafc',
        },
        'bg-secondary': {
          DEFAULT: '#1a1a2e',
          light: '#ffffff',
        },
        'accent-blue': '#0ea5e9',
        'accent-purple': '#a855f7',
        'accent-cyan': '#06b6d4',
        'text-primary': {
          DEFAULT: '#ffffff',
          light: '#1e293b',
        },
        'text-secondary': {
          DEFAULT: '#94a3b8',
          light: '#64748b',
        },
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'Poppins', 'sans-serif'],
        'body': ['Inter', 'Outfit', 'sans-serif'],
        'code': ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

