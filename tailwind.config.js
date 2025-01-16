/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#677D6A',
        "light-green":'#56815c54'
      },
    },
  },
  plugins: [],
}

