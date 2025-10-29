/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx,js,jsx}"
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#ff4500',
					dark: '#cc3700',
					light: '#ff6a33'
				}
			}
		}
	},
	plugins: []
};
