import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NOVATEK Brand Colors
        primary: {
          DEFAULT: '#0A2540', // Deep Ocean Blue
          light: '#1E4976',   // Ocean Blue Light
          accent: '#2E5C8A',  // Accent Blue
        },
        neutral: {
          bg: '#F5F7FA',      // Neutral Gray
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};

export default config;
