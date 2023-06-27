/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#101946',
				secondary: '#5772A8',
				third: '#1f37f0',
				middle: '#e38c42',
				accent: '#E8F0F6',
				mainDark: '#363e69',
				mainLessDark: '#384275',
				boxBackground: '#ffffff',

				body: '#e9f1f7',
				lighterBody: '#f0f5fa',
				lightestBody: '#ffffff',
				grayHeader: '#5F6571',
				faint: '#222937',
				darkSand: '#EDB280',
				darkBlue: '#052043',
				darkTeal: '#5B6B8B',
				postColor: '#ffffff',
				mainText: '#222937',
				mainGreen: '#81C4B4',
				mainGray: '#676778'
			},
			fontFamily: {
				Gantari: ['Gantari', 'sans'],
				fugaz: ['Fugaz One'],
				Yantramanav: ['Yantramanav'],
				Chivo: ['Chivo'],
				satoshi: ['Satoshi', 'sans-serif'],
				genSans: ['General Sans', 'sans-serif'],
				switzer: ['Switzer, sans-serif'],
				ranade: ['Ranade, sans-serif'],
				neco: ['Neco, serif']
			}
		}
	},
	plugins: []
};

// light green retro d1ebed
// dark sand EDB280
// slighty darker blue primary 027ed1
// promising purple secondary 564bf2
// mainDark:'#3F4FA2',
// mainLessDark:'#4557B2',
//old body FFE5D0
// old main green 81C4B4
// old lighter body faefe6
//old dark sand EDB280
// old background color FAE7DB
// alternative main blue 5B86D1
// old darkTeal 5B6B8B
// more old light sand colors:
// lightBody1: '#faefe6',
// lightBody2: '#f7e7da',

// normal main blue 5B6B8B
// normal main green 7AC1B5
// normal faint 6D6767

//viable option 1:
// mainDark: '#4F5E87',
// mainLessDark: '#566794',
// primary: '#0096f4',
// secondary: '#EDB280',
// body: '#E8F0F6',
