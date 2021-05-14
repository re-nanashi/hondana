//closes when the other one is opened
//Side bar hide content when closed;

/**
 *
 * @param {string} sideBarID
 * @param {string} openButtonID
 * @param {string} closeButtonID
 * @returns renders side bar
 */
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

/**
 *
 * @param {callback}  function that closes LeftSideBar
 * @param {callback} function that closes RightSideBar
 */
function observeSideBar(closeLeftSideBar, closeRightSideBar) {
	const checkUpdatesBar = window.matchMedia('(min-width: 901px)');
	const checkSideBar = window.matchMedia('(min-width: 1201px)');

	checkUpdatesBar.addEventListener('change', (e) => {
		if (e.matches) {
			closeRightSideBar();
		}
	});

	checkSideBar.addEventListener('change', (e) => {
		if (e.matches) {
			closeLeftSideBar();
		}
	});
}

export { sideBar, observeSideBar };
