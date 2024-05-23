/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        success: "#008656",
        error: "#fa0000",
      },
    },
  },
  plugins: [],
};
