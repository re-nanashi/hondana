import { sideBar, observeSideBar } from './side_bar.js';
import { Form } from './form.js';

//Event object
const Events = () => {
	return {
		run() {
			this.renderSideBar();
			this.renderModalFormController();
		},

		//Function: Deals with sidebar and updates bar events
		renderSideBar() {
			const leftSideBar = sideBar(
				'side_bar',
				'side_bar_btn',
				'.close_sidebar_btn_container'
			);
			const rightSideBar = sideBar(
				'updates_bar',
				'updates_btn',
				'.close_updatesbar_btn_container'
			);

			//Renders sidebar events
			leftSideBar.render();
			rightSideBar.render();

			//Observes changes on media queries to close sidebar
			observeSideBar(leftSideBar.closeSideBar, rightSideBar.closeSideBar);
		},

		//Function: render modal form events
		renderModalFormController() {
			const modal = this.formModalControllers();

			modal.render();
		},

		//Function: handles modal events
		formModalControllers() {
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
					//Remove text input from form
					document.querySelector('#address__url').value = '';

					//Remove current result
					Form.removeResults();

					//Close container
					pageContent.classList.remove('inactive');
					formContent.classList.add('hidden');
				},

				render() {
					//Calls Form's render method
					Form.render();

					//Event: Open form
					openButton.addEventListener('click', this.openForm);

					//Event: Close form
					closeButton.addEventListener('click', this.closeForm);
				},
			};
		},
	};
};

export { Events as init };
