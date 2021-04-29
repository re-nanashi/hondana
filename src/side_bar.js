// if width is greater than 900 turn off updates bar;
// if width is greater than 1200 turn off sidebar;
//closes when the other one is opened

const sideBar = (sideBarID, openButtonID, closeButtonID) => {
	const sideBar = document.getElementById(`${sideBarID}`);
	const sideBarButton = document.getElementById(`${openButtonID}`);
	const closeSideBarButton = document.querySelector(`${closeButtonID}`);

	return {
		openSideBar() {
			closeSideBarButton.classList.remove('hidden');
			sideBar.classList.remove('hidden');
		},

		closeSideBar() {
			closeSideBarButton.classList.add('hidden');
			sideBar.classList.add('hidden');
		},

		render() {
			sideBarButton.addEventListener('click', this.openSideBar);
			closeSideBarButton.addEventListener('click', this.closeSideBar);
		},
	};
};

export { sideBar };
