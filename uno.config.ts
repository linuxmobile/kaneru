import { defineConfig, presetTypography, presetWind3 } from "unocss";

export default defineConfig({
	presets: [presetWind3(), presetTypography()],
	theme: {
		fontFamily: {
			mono: "GeistMono",
			jp: "Tsunagi",
			alt: "Schabo",
		},
		colors: {
			"jp-red-deep": "#b3131a",
			"jp-red-bright": "#ff2229",
			"jp-blue": "#212475",
			"jp-purple": "#9691D4",
			"jp-dark-primary": "#090b0e",
			"jp-dark-secondary": "#1d1b1c",
			"jp-dark-terciary": "878787",
			"jp-white": "#ffffff",
			"jp-cream": "#dfd6af",

			accent: "#f780e2",
			variables: "#ed567a",
			bools: "#f7d96b",
			strings: "#02BF87",
			regex: "#6DD7E0",
			functions: "#7571F9",
			keywords: "#F780E2",
			tags: "#BBB6B6",
		},
	},
});
