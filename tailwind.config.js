module.exports = {
  theme: {
		colors: {
			white: "#ffffff",
			black: {
				lighter: "rgba(0, 0, 0, .3)",
				default: "#000000"
			},
			gray: {
				100: "#BDBDBD",
				900: "#121212"
			},
			purple: {
				500: "#9B51E0"
			}
		},
		fontFamily: {
			body: 'Montserrat',
		},
		extend: {
			backgroundColor: {
				transparent: "transparent"
			},
			backgroundPosition: {
				"bottom-20": "center bottom -5rem"
			},
		}
	},
	variants: {
		//backgroundSize: ['responsive', 'hover', 'focus']
	},
	plugins: [],
}
