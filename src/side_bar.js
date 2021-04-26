// if width is greater than 900 turn off updates bar;
// if width is greater than 1200 turn off sidebar;
//closes when the other one is opened

const sideBar = () => {
	const sideBar = document.getElementById('side_bar');
	const sideBarButton = document.getElementById('side_bar_btn');
	const closeSideBarButton = document.querySelector(
		'.close_sidebar_btn_container'
	);

	const updatesBar = document.getElementById('updates_bar');
	const updatesBarButton = document.getElementById('updates_btn');
	const closeUpdatesBarButton = document.querySelector(
		'.close_updatesbar_btn_container'
	);

	return {
		openSideBar() {
			closeSideBarButton.classList.remove('hidden');
			sideBar.classList.remove('hidden');
		},

		closeSideBar() {
			closeSideBarButton.classList.add('hidden');
			sideBar.classList.add('hidden');
		},

		openUpdatesBar() {
			closeUpdatesBarButton.classList.remove('hidden');
			updatesBar.classList.remove('hidden');
		},

		closeUpdatesBar() {
			closeUpdatesBarButton.classList.add('hidden');
			updatesBar.classList.add('hidden');
		},

		render() {
			sideBarButton.addEventListener('click', this.openSideBar);
			updatesBarButton.addEventListener('click', this.openUpdatesBar);
		},
	};
};

// const sideBar = sideBars();

// sideBar.init();

export { sideBar };
