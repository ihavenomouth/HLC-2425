/** @type {import('tailwindcss').Config} */
export default {
  // Utiliza la preferencia del sistema operativo o navegador para el tema claro/oscuro 
	darkMode: 'media',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('flowbite/plugin')
	],
}