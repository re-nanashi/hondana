//Module: Sidebar
const sidebars = (function () {
	'use strict';

	//Factory: Sidebar
	const sideBar = (sideBarID, openBtnID, closeBtnID) => {
		const sideBar = document.getElementById(`${sideBarID}`);
		const sideBarButton = document.getElementById(`${openBtnID}`);
		const closeSideBarButton = document.querySelector(`${closeBtnID}`);

		const _openSideBar = () => {
			closeSideBarButton.classList.remove('hidden');
			sideBar.classList.remove('hidden');
		};

		const _closeSideBar = () => {
			closeSideBarButton.classList.add('hidden');
			sideBar.classList.add('hidden');
		};

		const _bindEvents = () => {
			//Event: open sidebar
			sideBarButton.addEventListener('click', _openSideBar);

			//Event: close sidebar
			closeSideBarButton.addEventListener('click', _closeSideBar);
		};

		return {
			bind: _bindEvents,
			open: _openSideBar,
			close: _closeSideBar,
		};
	};

	const observeSideBar = (closeLeftSideBar, closeRightSideBar) => {
		const renderInspection = () => {
			//Event: inspect updates bar
			const checkUpdatesBar = window.matchMedia('(min-width: 901px)');

			checkUpdatesBar.addEventListener('change', (e) => {
				if (e.matches) closeRightSideBar();
			});

			//Event: inspect side bar
			const checkSideBar = window.matchMedia('(min-width: 1201px)');

			checkSideBar.addEventListener('change', (e) => {
				if (e.matches) {
					closeLeftSideBar();
				}
			});
		};

		return {
			on: renderInspection,
		};
	};

	return {
		render: function () {
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

			//Bind events
			leftSideBar.bind();
			rightSideBar.bind();

			//Observe media queries
			const observer = observeSideBar(leftSideBar.close, rightSideBar.close);
			observer.on();
		},
	};
})();

export { sidebars as Sidebar };
