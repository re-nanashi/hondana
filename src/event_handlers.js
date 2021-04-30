import { sideBar, observeSideBar } from './side_bar.js';
import { Form } from './add_form.js';

const UI = () => {
	return {
		run() {
			this.renderSideBar();
			this.renderBookForm();
		},

		//Function: Deals with sidebar and updates bar events
		renderSideBar() {
			const sideBars = sideBar(
				'side_bar',
				'side_bar_btn',
				'.close_sidebar_btn_container'
			);
			const updatesBar = sideBar(
				'updates_bar',
				'updates_btn',
				'.close_updatesbar_btn_container'
			);
			//Renders sidebar events
			sideBars.render();
			updatesBar.render();
			//Observes changes on media queries to close sidebar
			observeSideBar(sideBars.closeSideBar, updatesBar.closeSideBar);
		},

		//Function: Deals with modal form events
		renderBookForm() {
			const bookForm = Form();

			bookForm.render();
		},
	};
};

export { UI };
