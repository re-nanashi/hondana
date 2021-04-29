// Factory Function: Handles opening and closing of form
const Form = () => {
	const formContent = document.getElementById('form_container');
	const pageContent = document.getElementById('page_content');
	const openButton = document.querySelector('.addBook_btn');
	const closeButton = document.querySelector('#close_btn');

	return {
		openForm() {
			formContent.classList.remove('hidden');
			pageContent.classList.add('inactive');
		},

		closeForm() {
			formContent.classList.add('hidden');
			pageContent.classList.remove('inactive');
		},

		render() {
			//Event: Open form
			openButton.addEventListener('click', this.openForm);

			//Event: Close form
			closeButton.addEventListener('click', this.closeForm);
		},
	};
};

export { Form };
