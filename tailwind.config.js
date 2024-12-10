/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',  // 扫描 pages 目录下所有的 JavaScript/TypeScript 文件
    './components/**/*.{js,jsx,ts,tsx}'  // 扫描 components 目录下所有的 JavaScript/TypeScript 文件
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        fadeInScale: 'fadeInScale 0.3s ease-out',
        fadeOut: 'fadeOut 0.2s ease-in-out forwards',
        slideUp: 'slideUp 0.2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
