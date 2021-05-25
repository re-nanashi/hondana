import { sideBar, observeSideBar } from './side_bar.js';
import { Form } from './form.js';
import { LibraryUI } from './library_UI.js';

//Event object
const Events = () => {
	return {
		run() {
			this.renderSideBar();
			this.renderModalFormController();
			LibraryUI.on();
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
			Form.render();
		},
	};
};

export { Events as init };
