interface SideBar {
	openSideBar(): void;
	closeSideBar(): void;
}

class SideBarCreator implements SideBar {
	private sideBar: HTMLElement;
	private sideBarButton: HTMLElement;
	private closeSideBarButton: HTMLElement;

	private _bindSideBarEvents = (): void => {
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
		this._bindSideBarEvents();
	}

	public openSideBar = (): void => {
		this.closeSideBarButton.classList.remove('hidden');
		this.sideBar.classList.remove('hidden');
	};

	public closeSideBar = (): void => {
		this.closeSideBarButton.classList.add('hidden');
		this.sideBar.classList.add('hidden');
	};
}

class SideBarObserver {
	private sideBar: SideBar;
	private checkSideBar: MediaQueryList;

	constructor(sideBar: SideBar) {
		this.sideBar = sideBar;
		this.checkSideBar = window.matchMedia('(min-width: 1201px)');

		//Explicitly call render
		this._renderInspection();
	}

	private _renderInspection = (): void => {
		//Event: inspect side bar
		this.checkSideBar.addEventListener('change', (e) => {
			if (e.matches) {
				this.sideBar.closeSideBar();
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

	new SideBarObserver(leftSideBar);
};
