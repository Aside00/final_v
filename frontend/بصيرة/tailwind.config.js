
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1B4965',
          light: '#2D6A8F',
          dark: '#0F2D3F',
        },
        accent: {
          DEFAULT: '#5FA8D3',
          light: '#BEE9E8',
        },
        gold: {
          DEFAULT: '#C4A35A',
          light: '#E8D5A3',
        },
      },
    },
  },
}
