/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        valmet: {
          blue: '#003366',
          orange: '#FF6600',
          gray: '#F5F5F5',
          dark: '#333333',
          green: '#00CC99'
        }
      }
    }
  },
  plugins: []
}
