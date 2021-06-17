interface SideBar {
	closeSideBar(): void;
}

class SideBarCreator implements SideBar {
	private sideBar: HTMLElement;
	private sideBarButton: HTMLElement;
	private closeSideBarButton: HTMLElement;

	private openSideBar = (): void => {
		this.closeSideBarButton.classList.remove('hidden');
		this.sideBar.classList.remove('hidden');
	};

	private bindSideBarEvents = (): void => {
		//Event: open sidebar
		this.sideBarButton.addEventListener('click', this.openSideBar);

		//Event: close sidebar
		this.closeSideBarButton.addEventListener('click', this.closeSideBar);
	};

	constructor(sideBarID: string, openBtnID: string, closeBtnID: string) {
		this.sideBar = document.getElementById(`${sideBarID}`);
		this.sideBarButton = document.getElementById(`${openBtnID}`);
		this.closeSideBarButton = document.querySelector(`${closeBtnID}`);

		//Explicitly call sidebar events
		this.bindSideBarEvents();
	}

	public closeSideBar = (): void => {
		this.closeSideBarButton.classList.add('hidden');
		this.sideBar.classList.add('hidden');
	};
}

interface Observer {
	renderInspection(): void;
}

class SideBarObserver implements Observer {
	private leftSideBar: SideBar;
	private rightSideBar: SideBar;
	private checkUpdatesBar: MediaQueryList;
	private checkSideBar: MediaQueryList;

	constructor(leftSideBar: SideBar, rightSideBar: SideBar) {
		this.leftSideBar = leftSideBar;
		this.rightSideBar = rightSideBar;
		this.checkUpdatesBar = window.matchMedia('(min-width: 901px)');
		this.checkSideBar = window.matchMedia('(min-width: 1201px)');

		//Explicitly call render
		this.renderInspection();
	}

	renderInspection = (): void => {
		//Event: inspect updates bar
		this.checkUpdatesBar.addEventListener('change', (e) => {
			if (e.matches) this.rightSideBar.closeSideBar();
		});

		//Event: inspect side bar
		this.checkSideBar.addEventListener('change', (e) => {
			if (e.matches) {
				this.leftSideBar.closeSideBar();
			}
		});
	};
}

export const renderSideBar = (): void => {
	const leftSideBar = new SideBarCreator(
		'side_bar',
		'side_bar_btn',
		'.close_sidebar_btn_container'
	);

	const rightSideBar = new SideBarCreator(
		'updates_bar',
		'updates_btn',
		'.close_updatesbar_btn_container'
	);

	new SideBarObserver(leftSideBar, rightSideBar);
};
