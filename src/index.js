import { UI } from './event_handlers.js';

const page = UI();

page.run();

const sample = document.getElementById('fetch');

sample.addEventListener('click', function () {
	testing('mangakakalot');
});

async function testing(website) {
	let response = (
		await fetch(
			`https://magna-sc.cf/manga?q=${website}"`,
			{
				method: 'GET',
			},
			{ mode: 'no-cors' }
		)
	).json();

	console.log(response);
}
