export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        sm: '0 1px 3px rgba(255, 255, 255, 0.1)',
        md: '0 4px 6px rgba(255, 255, 255, 0.25)',
        lg: '0 10px 20px rgba(255, 255, 255, 0.5)',
        'dark-sm': '0 1px 3px rgba(0, 0, 0, 0.85)',
        'dark-md': '0 4px 6px rgba(0, 0, 0, 0.75)',
        'dark-lg': '0 10px 20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
