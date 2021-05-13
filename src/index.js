import { init } from './event_handlers.js';

const page = init();

page.run();

// const sample = document.getElementById('fetch');

// sample.addEventListener('click', function () {
// 	testing('mangakatana.com/manga/the-max-level-hero-has-returned.25329');
// });

async function testing(website) {
	let response = (
		await fetch(
			`https://kiru-js.vercel.app/direct?url=${website}`,
			{
				method: 'GET',
			},
			{ mode: 'no-cors' }
		)
	).json();

	// let response2 = (
	// 	await fetch(
	// 		`https://kiru-js.vercel.app/direct?url=https://manganelo.com/manga/eq925181`,
	// 		{
	// 			method: 'GET',
	// 		},
	// 		{ mode: 'no-cors' }
	// 	)
	// ).json();

	let result = await response;
	// let result2 = await response2;

	console.log(result);
	// console.log(result2);
}

// const mql = window.matchMedia('(min-width: 901px)');

// mql.addEventListener('change', (e) => {
// 	if (e.matches) {
// 		console.log('hey');
// 	} else {
// 		console.log('lol');
// 	}
// });
