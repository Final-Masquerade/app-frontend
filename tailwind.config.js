/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-primary": "#070707",
        "text-primary": "#fff",
        "text-secondary": "#d7d7d7",
        accent: "#D7FC6E",
      },
      fontFamily: {
        gilroy: "Gilroy, sans-serif",
        "gilroy-black": "GilroyBlack, sans-serif",
        "gilroy-bold": "GilroyBold, sans-serif",
        "gilroy-extrabold": "GilroyExtraBold, sans-serif",
        "gilroy-heavy": "GilroyHeavy, sans-serif",
        "gilroy-light": "GilroyLight, sans-serif",
        "gilroy-medium": "GilroyMedium, sans-serif",
        "gilroy-semibold": "GilroySemiBold, sans-serif",
        "gilroy-thin": "GilroyThin, sans-serif",
      },
    },
  },
  plugins: [],
};
