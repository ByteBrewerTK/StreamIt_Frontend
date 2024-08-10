/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				accent: "var(--color-accent)",
				muted: "var(--color-muted)",
				muted_border: "var(--color-border-muted)",
			},

			width: {
				container: "var(--width-container)",
			},
			height: {
				container: "var(--height-container)",
				navbar: "var(--height-navbar)",
			},
			padding : {
				navbar: "var(--height-navbar)",

			},
			fontSize: {
				smr: "var(--font-small)",
				mid: "var(--font-normal)",
				lrg: "var(--font-large)",
				lgr: "var(--font-larger)",
				lgt: "var(--font-largest)",
				mv: "var(--font-massive)",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
