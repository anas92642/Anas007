/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        glow: {
          '0%, 100%': { 
            textShadow: '0 0 2px rgba(145, 94, 255, 0.2), 0 0 4px rgba(145, 94, 255, 0.2)',    
            boxShadow: '0 0 4px rgba(145, 94, 255, 0.3)' 
          },
          '50%': { 
            textShadow: '0 0 4px rgba(145, 94, 255, 0.3), 0 0 8px rgba(145, 94, 255, 0.3)',    
            boxShadow: '0 0 8px rgba(145, 94, 255, 0.5)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        breathe: 'breathe 3s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite'
      },
    },
  },
  plugins: [],
};
