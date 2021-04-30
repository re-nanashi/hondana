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

function observeSideBar(closeSideBar, closeUpdatesBar) {
	const checkUpdatesBar = window.matchMedia('(min-width: 901px)');
	const checkSideBar = window.matchMedia('(min-width: 1201px)');

	checkUpdatesBar.addEventListener('change', (e) => {
		if (e.matches) {
			closeUpdatesBar();
		}
	});

	checkSideBar.addEventListener('change', (e) => {
		if (e.matches) {
			closeSideBar();
		}
	});
}

export { sideBar, observeSideBar };
