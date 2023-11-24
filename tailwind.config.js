/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,ts,tsx,cjs,js}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "6xl": ["68px", "72px"],
        biggestFont: [
          "4.25rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        galleryFont: [
          "2.25rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "5xl": [
          "3.25rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
      },
    },
  },
  plugins: [],
};
