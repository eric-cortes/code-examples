/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#e2001a',
        'brand-black': '#393A42',
        'brand-white': '#FFFFFF',
        'brand-light': '#ff1631',
        'brand-dark': '#af0014',
        'brand-red': '#6c0710',
        'brand-grey-light': '#DFE6EB',
        'brand-grey-dark': '#8D93AB',
        'brand-cyan': '#31B7BC',
      },
    },
  },
  plugins: [],
  //important: true,
}
