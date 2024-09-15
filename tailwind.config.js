/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        'featurec-bg':'#43884D',
        'featurech-bg':'#377F42',
        'home-bg':'#66AD71'
      }
    },
  },
  plugins: [],
}

